import { defineStore } from 'pinia';
import { ref } from 'vue';

interface ConversationHistoryItem {
	id: string;
	role: 'user' | 'assistant';
	content: string;
}

export const useAgent = defineStore('agent', () => {
	const history = ref<ConversationHistoryItem[]>([]);
	const groqApiKey = ref<string | null>(null);

	async function promptStreaming(onChunk: (chunk: string) => void): Promise<string> {
		/*
		if (!mlcEngine.value) throw new Error('mlc engine is null');

		const chunks = await mlcEngine.value.chat.completions.create({
			messages: history.value,
			temperature: 1,
			stream: true,
			stream_options: { include_usage: true },
		});

		for await (const chunk of chunks as AsyncIterable<ChatCompletionChunk>) {
			onChunk(chunk.choices[0]?.delta.content || '');
		}

		const fullReply = await mlcEngine.value.getMessage();

		return fullReply;
		*/

		return 'uwu';
	}

	return { history, promptStreaming };
});
