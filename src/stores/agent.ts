import { defineStore, storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { createGroq, type GroqProvider } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { useSettings } from '@/composables/settings';
import { useCode } from './code';

interface ConversationHistoryItem {
	id: string;
	role: 'user' | 'assistant';
	content: string;
}

export const useAgent = defineStore('agent', () => {
	const codeStore = useCode();

	const { settings } = useSettings();

	const { code } = storeToRefs(codeStore);

	const history = ref<ConversationHistoryItem[]>([]);
	const groqApiKey = computed(() => settings.value?.groqApiKey || null);
	const groq = ref<GroqProvider | null>(null);

	function onAdd(chunk: string) {
		code.value += chunk;
	}

	function onClear() {
		code.value = '';
	}

	async function promptStreaming(onChunk: (chunk: string) => void): Promise<string> {
		if (!groq.value) {
			try {
				initGroq();
			} catch (error) {
				console.error(error);
				throw error;
			}
		}

		const instructions = `
You are an AI agent in markdowned to help the user with their Markdown document.

Markdown document context: ${code.value}

Use these tags to integrate with the system:
$$add$$[content you want to add]^^add^^ - adds content to the end of the file
$$clear$$^^clear^^ - clears the current content of the file

Examples:

Adding content to the file:
$$add$$
Lorem ipsum dolor sit
^^add^^

Clearing contet in the file:
$$clear$$^^clear^^

Clearing and adding content to the file:
$$clear$$^^clear^^
$$add$$
Lorem ipsum dolor sit
^^add^^

You are encouraged to use Markdown and avoid HTML tags when interacting with the document. Only use HTML tags if neccessary as it clutters up the user's document.
`;

		const result = streamText({
			model: groq.value!('llama-3.1-8b-instant'),
			messages: history.value,
			instructions: instructions,
		});

		let buffer = '';
		let isAdding = false;
		let isClearing = false;

		const openAdd = '$$add$$';
		const closeAdd = '^^add^^';
		const openClear = '$$clear$$';
		const closeClear = '^^clear^^';

		const maxTagLength = Math.max(
			openAdd.length,
			closeAdd.length,
			openClear.length,
			closeClear.length,
		);

		for await (const chunk of result.textStream) {
			buffer += chunk;

			let progress = true;
			while (progress) {
				progress = false;

				if (!isAdding && !isClearing) {
					const addIdx = buffer.indexOf(openAdd);
					const clearIdx = buffer.indexOf(openClear);

					if (addIdx !== -1 && (clearIdx === -1 || addIdx < clearIdx)) {
						const before = buffer.slice(0, addIdx);
						if (before) onChunk(before);
						buffer = buffer.slice(addIdx + openAdd.length);
						isAdding = true;
						progress = true;
					} else if (clearIdx !== -1) {
						const before = buffer.slice(0, clearIdx);
						if (before) onChunk(before);
						buffer = buffer.slice(clearIdx + openClear.length);
						isClearing = true;
						progress = true;
					}
				} else if (isAdding) {
					const closeIdx = buffer.indexOf(closeAdd);
					if (closeIdx !== -1) {
						const content = buffer.slice(0, closeIdx);
						if (content) onAdd(content);
						buffer = buffer.slice(closeIdx + closeAdd.length);
						isAdding = false;
						progress = true;
					}
				} else if (isClearing) {
					const closeIdx = buffer.indexOf(closeClear);
					if (closeIdx !== -1) {
						onClear();
						buffer = buffer.slice(closeIdx + closeClear.length);
						isClearing = false;
						progress = true;
					}
				}
			}

			if (!isAdding && !isClearing && buffer.length > maxTagLength) {
				const safeLen = buffer.length - maxTagLength;
				const safe = buffer.slice(0, safeLen);
				onChunk(safe);
				buffer = buffer.slice(safeLen);
			}
		}

		if (buffer) {
			if (isAdding) onAdd(buffer);
			else if (isClearing) onClear();
			else onChunk(buffer);
		}

		const rawResult = await result.text;

		const tagRegex = /\$\$(add|clear)\$\$|\^\^(add|clear)\^\^/g;
		const textResult = rawResult.replace(tagRegex, '');

		return textResult;
	}

	function initGroq() {
		if (!groqApiKey.value) throw new Error('api key not set');

		groq.value = createGroq({ apiKey: groqApiKey.value });
	}

	return { history, groqApiKey, promptStreaming, initGroq };
});
