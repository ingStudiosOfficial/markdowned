<script setup lang="ts">
import { useCode } from '@/stores/code';
import { marked } from 'marked';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import DOMPurify from 'dompurify';

const codeStore = useCode();

const { code } = storeToRefs(codeStore);

const markdown = ref<string>('');

watch(code, async (newValue) => {
	markdown.value = DOMPurify.sanitize(await marked.parse(newValue));
});
</script>

<template>
	<div class="preview-wrapper" v-html="markdown"></div>
</template>

<style scoped>
.preview-wrapper {
	background: none;
	outline: none;
	border: none;
	font-family: 'Noto Serif';
}
</style>
