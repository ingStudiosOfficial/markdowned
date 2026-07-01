<script setup lang="ts">
import { useDialog } from '@/composables/dialog';
import type { korCheckbox, korModal } from '@kor-ui/kor';
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue';

const { apiDialog } = useDialog();

const dialog = useTemplateRef<korModal>('apiDialog');
const enableAi = ref<boolean>(false);

function onKey(event: KeyboardEvent) {
	if (event.key.toLowerCase() === 'escape') {
		event.preventDefault();
		if (dialog.value && dialog.value.visible) dialog.value.visible = false;
	}
}

onMounted(() => {
	apiDialog.value = dialog.value;

	document.addEventListener('keydown', onKey);
});

onUnmounted(() => {
	document.removeEventListener('keydown', onKey);
});
</script>

<template>
	<kor-modal ref="apiDialog" icon="settings" label="Configure Groq API">
		<kor-checkbox label="Enable optional AI features" @input="enableAi = !enableAi"></kor-checkbox>
		<div v-if="enableAi">
			<kor-input type="text" label="Groq API key"></kor-input>
		</div>
	</kor-modal>
</template>
