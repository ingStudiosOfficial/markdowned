import { defineStore } from 'pinia';
import { ref } from 'vue';
import { createGroq, type GroqProvider } from '@ai-sdk/groq';
import { streamText } from 'ai';

interface ConversationHistoryItem {
	id: string;
	role: 'user' | 'assistant';
	content: string;
}

export const useAgent = defineStore('agent', () => {
	const history = ref<ConversationHistoryItem[]>([]);
	const groqApiKey = ref<string | null>(null);
	const groq = ref<GroqProvider | null>(null);

	async function promptStreaming(onChunk: (chunk: string) => void): Promise<string> {
		if (!groq.value) throw new Error('groq not initialized');

		const result = streamText({
			model: groq.value('llama-3.1-8b-instant'),
			messages: history.value,
		});

		for await (const chunk of result.textStream) {
			onChunk(chunk);
		}

		return result.output;
	}

	function initGroq() {
		if (!groqApiKey.value) throw new Error('groq api key missing');

		groq.value = createGroq({ apiKey: groqApiKey.value });
	}

	return { history, groqApiKey, promptStreaming, initGroq };
});
