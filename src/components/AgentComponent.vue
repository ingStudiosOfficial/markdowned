<script setup lang="ts">
import { useCode } from '@/stores/code';
import { storeToRefs } from 'pinia';

const codeStore = useCode();

const { code } = storeToRefs(codeStore);
</script>

<template>
	<div class="content">
		<p>hi</p>
	</div>
	<div class="footer" slot="footer">
		<kor-input label="Ask Markdown Agent"></kor-input>
		<kor-button icon="send" color="primary"></kor-button>
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
</style>
