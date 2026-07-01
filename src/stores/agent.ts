import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
	CreateMLCEngine,
	MLCEngine,
	prebuiltAppConfig,
	type InitProgressCallback,
} from '@mlc-ai/web-llm';

interface ConversationHistoryItem {
	id: string;
	role: 'user' | 'assistant';
	content: string;
}

export const useAgent = defineStore('agent', () => {
	const history = ref<ConversationHistoryItem[]>([]);
	const mlcEngine = ref<MLCEngine | null>(null);

	const model = 'HF://mlc-ai/gemma-3-1b-it-q4f16_1-MLC';

	async function createMlcEngine(progressCallback: InitProgressCallback) {
		mlcEngine.value = await CreateMLCEngine(model, {
			initProgressCallback: progressCallback,
			appConfig: { ...prebuiltAppConfig, cacheBackend: 'indexeddb' },
		});
	}

	async function promptStreaming(onChunk: (chunk: string) => void): Promise<string> {
		if (!mlcEngine.value) throw new Error('mlc engine is null');

		const chunks = await mlcEngine.value.chat.completions.create({
			messages: history.value,
			temperature: 1,
			stream: true,
			stream_options: { include_usage: true },
		});

		for await (const chunk of chunks) {
			onChunk(chunk.choices[0]?.delta.content || '');
		}

		const fullReply = await mlcEngine.value.getMessage();

		return fullReply;
	}

	return { history, mlcEngine, createMlcEngine, promptStreaming };
});
