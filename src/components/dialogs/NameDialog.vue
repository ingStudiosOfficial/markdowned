<script setup lang="ts">
import { useDialog } from '@/composables/dialog';
import { useCode } from '@/stores/code';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted } from 'vue';

const codeStore = useCode();

const { nameDialog } = useDialog();

const { filename } = storeToRefs(codeStore);

function closeDialog() {
	if (nameDialog.value && nameDialog.value.visible) {
		nameDialog.value.visible = false;
	}
}

function onKey(event: KeyboardEvent) {
	if (event.key.toLowerCase() === 'escape') {
		event.preventDefault();
		closeDialog();
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
	<kor-modal v-if="filename" ref="nameDialog" icon="edit" label="Rename Document">
		<kor-input v-model="filename" label="Name"></kor-input>
		<kor-button slot="footer" label="OK" icon="check" @click="closeDialog()"></kor-button>
	</kor-modal>
</template>
