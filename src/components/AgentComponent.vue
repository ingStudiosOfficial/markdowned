<script setup lang="ts">
import { useAgent } from '@/stores/agent';
import { useCode } from '@/stores/code';
import type { korInput } from '@kor-ui/kor';
import { storeToRefs } from 'pinia';
import { useTemplateRef } from 'vue';
import ApiDialog from './dialogs/ApiDialog.vue';
import { useDialog } from '@/composables/dialog.ts';

const codeStore = useCode();
const agentStore = useAgent();

const { apiDialog } = useDialog();

const { code } = storeToRefs(codeStore);
const { history, groqApiKey } = storeToRefs(agentStore);

const promptBox = useTemplateRef<korInput>('promptBox');

async function onSend() {
	if (!promptBox.value || promptBox.value.value === '') return;

	history.value.push({
		id: crypto.randomUUID(),
		role: 'user',
		content: promptBox.value.value || '',
	});

	history.value.push({
		id: crypto.randomUUID(),
		role: 'assistant',
		content: '',
	});

	agentStore.promptStreaming(onChunk);

	promptBox.value.value = '';
}

function onChunk(chunk: string) {
	history.value[history.value.length - 1]!.content += chunk;
}

function toggleApiDialog() {
	if (!apiDialog.value) return;

	apiDialog.value.visible = !apiDialog.value.visible;
}
</script>

<template>
	<kor-icon icon="settings" slot="functions" :button="true" @click="toggleApiDialog()"></kor-icon>
	<div
		class="content"
		:style="{
			alignItems: !groqApiKey ? 'center' : 'flex-start',
			justifyContent: !groqApiKey ? 'center' : 'flex-start',
		}"
	>
		<kor-empty-state
			v-if="!groqApiKey"
			label="Provide a Groq API key to get started"
			icon="assistant"
		>
		</kor-empty-state>
		<div v-else v-for="item in history" :key="item.id">
			<b>{{ item.role }}</b>
			<p>{{ item.content }}</p>
		</div>
	</div>
	<div v-if="groqApiKey" class="footer" slot="footer">
		<kor-input ref="promptBox" label="Ask Markdown Agent" @keydown.enter="onSend()"></kor-input>
		<kor-button icon="send" color="primary" @click="onSend()"></kor-button>
	</div>

	<ApiDialog></ApiDialog>
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
