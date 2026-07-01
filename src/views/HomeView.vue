<script setup lang="ts">
import AgentComponent from '@/components/AgentComponent.vue';
import EditorComponent from '@/components/EditorComponent.vue';
import PreviewComponent from '@/components/PreviewComponent.vue';
</script>

<template>
	<kor-pane slot="left" icon="edit" label="Edit Markdown" class="editor-pane">
		<EditorComponent></EditorComponent>
	</kor-pane>
	<kor-pane slot="left" icon="desktop_windows" label="Output" class="editor-pane">
		<PreviewComponent></PreviewComponent>
	</kor-pane>
	<kor-pane slot="left" icon="assistant" label="Markdown Agent" class="editor-pane">
		<AgentComponent></AgentComponent>
	</kor-pane>
</template>

<style scoped>
.editor-pane {
	width: calc(100svw / 3);
	box-sizing: border-box;
}
</style>
