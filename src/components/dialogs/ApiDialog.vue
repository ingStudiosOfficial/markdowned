<script setup lang="ts">
import { useDialog } from '@/composables/dialog';
import { useSettings } from '@/composables/settings';
import { onMounted, onUnmounted } from 'vue';

const { apiDialog } = useDialog();
const { settings, setSettings } = useSettings();

function onKey(event: KeyboardEvent) {
	if (event.key.toLowerCase() === 'escape') {
		event.preventDefault();
		if (apiDialog.value && apiDialog.value.visible) {
			apiDialog.value.visible = false;
		}
	}
}

onMounted(() => {
	document.addEventListener('keydown', onKey);
});

onUnmounted(() => {
	document.removeEventListener('keydown', onKey);
});
</script>

<template>
	<kor-modal v-if="settings" ref="apiDialog" icon="settings" label="Configure Groq API">
		<kor-checkbox
			ref="enableAiCheckbox"
			label="Enable optional AI features"
			:active="settings.aiEnabled"
			@active-changed="settings.aiEnabled = $event.target.active"
		></kor-checkbox>
		<div v-if="settings.aiEnabled">
			<kor-input v-model="settings.groqApiKey" type="text" label="Groq API key"></kor-input>
		</div>
		<kor-button slot="footer" label="Save" icon="save" @click="setSettings()"></kor-button>
	</kor-modal>
</template>
