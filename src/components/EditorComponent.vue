<script setup lang="ts">
import { useCode } from '@/stores/code';
import { storeToRefs } from 'pinia';

const codeStore = useCode();

const { code } = storeToRefs(codeStore);
</script>

<template>
	<textarea class="editor-wrapper"></textarea>
</template>

<style scoped>
.editor-wrapper {
	background: none;
	outline: none;
	border: none;
	font-family: 'Noto Sans Mono';
	resize: none;
}
</style>
