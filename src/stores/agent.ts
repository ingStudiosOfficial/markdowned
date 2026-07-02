import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { createGroq, type GroqProvider } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { useSettings } from '@/composables/settings';

interface ConversationHistoryItem {
	id: string;
	role: 'user' | 'assistant';
	content: string;
}

export const useAgent = defineStore('agent', () => {
	const { settings } = useSettings();

	const history = ref<ConversationHistoryItem[]>([]);
	const groqApiKey = computed(() => settings.value?.groqApiKey || null);
	const groq = ref<GroqProvider | null>(null);

	async function promptStreaming(onChunk: (chunk: string) => void): Promise<string> {
		if (!groq.value) {
			try {
				initGroq();
			} catch (error) {
				console.error(error);
				throw error;
			}
		}

		const result = streamText({
			model: groq.value!('llama-3.1-8b-instant'),
			messages: history.value,
		});

		for await (const chunk of result.textStream) {
			onChunk(chunk);
		}

		return await result.text;
	}

	function initGroq() {
		if (!groqApiKey.value) throw new Error('api key not set');

		groq.value = createGroq({ apiKey: groqApiKey.value });
	}

	return { history, groqApiKey, promptStreaming, initGroq };
});
