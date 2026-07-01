<script setup lang="ts">
import { useAgent } from '@/stores/agent';
import { useCode } from '@/stores/code';
import type { korInput } from '@kor-ui/kor';
import type { InitProgressReport } from '@mlc-ai/web-llm';
import { storeToRefs } from 'pinia';
import { ref, useTemplateRef } from 'vue';

const codeStore = useCode();
const agentStore = useAgent();

const { code } = storeToRefs(codeStore);
const { history, mlcEngine } = storeToRefs(agentStore);

const promptBox = useTemplateRef<korInput>('promptBox');
const creatingEngine = ref<boolean>(false);
const progReport = ref<InitProgressReport | null>(null);

async function onSend() {
	if (!promptBox.value || promptBox.value.value === '') return;

	history.value.push({
		id: crypto.randomUUID(),
		role: 'user',
		content: promptBox.value.value || '',
	});

	if (!mlcEngine) {
		creatingEngine.value = true;
		await agentStore.createMlcEngine(mlcCallback);
	}

	history.value.push({
		id: crypto.randomUUID(),
		role: 'assistant',
		content: '',
	});

	agentStore.promptStreaming(onChunk);

	promptBox.value.value = '';
}

function mlcCallback(prog: InitProgressReport) {
	progReport.value = prog;
}

function onChunk(chunk: string) {
	history.value[history.value.length - 1]!.content += chunk;
}
</script>

<template>
	<div class="content">
		<div v-if="creatingEngine && progReport" class="creating-loader">
			<kor-progress-bar
				radial
				:value="progReport.progress"
				:label="progReport.text"
				:info="`${progReport.progress}% done (${progReport.timeElapsed} elapsed)`"
			></kor-progress-bar>
		</div>
		<div v-else v-for="item in history" :key="item.id">
			<b>{{ item.role }}</b>
			<p>{{ item.content }}</p>
		</div>
	</div>
	<div class="footer" slot="footer">
		<kor-input ref="promptBox" label="Ask Markdown Agent" @keydown.enter="onSend()"></kor-input>
		<kor-button icon="send" color="primary" @click="onSend()"></kor-button>
	</div>
</template>

<style scoped>
.footer {
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: 8px;
}

.content {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
}

.creating-loader {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 8px;
}
</style>
