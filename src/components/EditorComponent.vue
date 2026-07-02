<script setup lang="ts">
import { useCode } from '@/stores/code';
import { storeToRefs } from 'pinia';
import { computed, useTemplateRef, watch } from 'vue';

const codeStore = useCode();

const { code } = storeToRefs(codeStore);

const editorOverlay = useTemplateRef<HTMLDivElement>('editorOverlay');
const editorTextarea = useTemplateRef<HTMLTextAreaElement>('editorTextarea');

function handleScroll() {
	if (!editorOverlay.value || !editorTextarea.value) return;

	editorOverlay.value.scrollTop = editorTextarea.value.scrollTop;
	editorOverlay.value.scrollLeft = editorTextarea.value.scrollLeft;
}

const displayCode = computed(() => code.value + '\u200b');
</script>

<template>
	<div class="editor">
		<div ref="editorOverlay" class="editor-wrapper editor-overlay">{{ displayCode }}</div>
		<textarea
			ref="editorTextarea"
			v-model="code"
			class="editor-wrapper editor-textarea"
			@scroll="handleScroll()"
		></textarea>
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
	font-family: 'Noto Sans Mono', monospace;
	resize: none;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	font-size: 1rem;
	padding: 8px;
	white-space: pre-wrap;
	word-wrap: break-word;
	line-height: 1.5;
	overflow-y: scroll;
	overflow-x: hidden;
	word-break: break-all;
}

.editor-overlay {
	z-index: 2;
	pointer-events: none;
}

.editor-textarea {
	z-index: 1;
	caret-color: black;
}
</style>
