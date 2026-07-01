<script setup lang="ts">
import { useCode } from '@/stores/code';
import { storeToRefs } from 'pinia';

const codeStore = useCode();

const { code } = storeToRefs(codeStore);
</script>

<template>
	<div class="editor">
		<div class="editor-wrapper editor-overlay">{{ code }}</div>
		<textarea v-model="code" class="editor-wrapper editor-textarea"></textarea>
	</div>
</template>

<style scoped>
.editor {
	position: relative;
	width: 100%;
	height: 100%;
}

.editor-wrapper {
	position: absolute;
	top: 0;
	left: 0;
	background: none;
	outline: none;
	border: none;
	font-family: 'Noto Sans Mono';
	resize: none;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	font-size: 1rem;
	padding: 8px;
	white-space: pre-wrap;
	word-wrap: break-word;
	line-height: 1.5;
}

.editor-overlay {
	z-index: 2;
	pointer-events: none;
}

.editor-textarea {
	z-index: 1;
}
</style>
