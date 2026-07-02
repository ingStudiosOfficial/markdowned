<script setup lang="ts">
import { useCode } from '@/stores/code';
import { storeToRefs } from 'pinia';
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue';

const codeStore = useCode();

const { code } = storeToRefs(codeStore);

const editorOverlay = useTemplateRef<HTMLDivElement>('editorOverlay');
const editorTextarea = useTemplateRef<HTMLTextAreaElement>('editorTextarea');
const hemingwayEnabled = ref<boolean>(false);

function handleScroll() {
	if (!editorOverlay.value || !editorTextarea.value) return;

	editorOverlay.value.scrollTop = editorTextarea.value.scrollTop;
	editorOverlay.value.scrollLeft = editorTextarea.value.scrollLeft;
}

function onKey(event: KeyboardEvent) {
	if (event.key.toLowerCase() === 'backspace' && hemingwayEnabled.value) {
		event.preventDefault();
	}
}

const displayCode = computed(() => code.value + '\u200b');

const spans = computed(() => displayCode.value.split('\n'));

const wordCount = computed(() => {
	const trimmed = code.value.trim();
	if (trimmed === '') {
		return 0;
	}

	return trimmed.split(/\s+/).length;
});

onMounted(() => {
	document.addEventListener('keydown', onKey);
});

onUnmounted(() => {
	document.removeEventListener('keydown', onKey);
});
</script>

<template>
	<kor-button
		id="hemingway"
		slot="functions"
		:color="hemingwayEnabled ? 'secondary' : 'tertiary'"
		icon="backspace"
		@click="hemingwayEnabled = !hemingwayEnabled"
	></kor-button>
	<kor-tooltip target="#hemingway" position="bottom"> Toggle Hemingway mode </kor-tooltip>
	<div class="editor">
		<div ref="editorOverlay" class="editor-wrapper editor-overlay">
			<pre
				v-for="(line, index) in spans"
				:key="index"
				:class="line.startsWith('#') ? 'highlighted' : ''"
				>{{ line }}</pre
			>
		</div>
		<textarea
			ref="editorTextarea"
			v-model="code"
			class="editor-wrapper editor-textarea"
			@scroll="handleScroll()"
		></textarea>
	</div>
	<p slot="footer">{{ code.length }} characters, {{ wordCount }} words</p>
</template>

<style scoped>
.editor {
	position: relative;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
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

.editor-wrapper::-webkit-scrollbar {
	display: none;
}

.editor-overlay {
	z-index: 2;
	pointer-events: none;
	display: flex;
	flex-direction: column;
	pre {
		all: unset;
	}
	pre:empty::before {
		content: '\A';
		white-space: pre;
	}
	.highlighted {
		color: var(--accent-1-rgb);
	}
}

.editor-textarea {
	z-index: 1;
	caret-color: var(--accent-1-rgb);
}
</style>
