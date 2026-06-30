<script setup lang="ts">
import EditorComponent from '@/components/EditorComponent.vue';
</script>

<template>
	<kor-pane slot="left" icon="edit" label="Edit Markdown" class="editor-pane">
		<EditorComponent></EditorComponent>
	</kor-pane>
	<kor-pane slot="left" icon="desktop_windows" label="Output" class="editor-pane"> </kor-pane>
	<kor-pane slot="left" icon="assistant" label="Markdown Agent" class="editor-pane"> </kor-pane>
</template>

<style scoped>
.editor-pane {
	width: calc(100svw / 3);
}
</style>
