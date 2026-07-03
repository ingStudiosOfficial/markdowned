<script setup lang="ts">
import AgentComponent from '@/components/AgentComponent.vue';
import EditorComponent from '@/components/EditorComponent.vue';
import PreviewComponent from '@/components/PreviewComponent.vue';
import { useMobile } from '@/composables/mobile';
import { ref } from 'vue';

const { isMobile } = useMobile();

const mobileViewMode = ref<'editor' | 'preview' | 'agent'>('editor');
</script>

<template>
	<template v-if="!isMobile">
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
	<template v-else>
		<kor-pane v-show="mobileViewMode === 'editor'" slot="left" class="mobile-pane">
			<EditorComponent></EditorComponent>
		</kor-pane>
		<kor-pane v-show="mobileViewMode === 'preview'" slot="left" class="mobile-pane">
			<PreviewComponent></PreviewComponent>
		</kor-pane>
		<kor-pane v-show="mobileViewMode === 'agent'" slot="left" class="mobile-pane">
			<AgentComponent></AgentComponent>
		</kor-pane>
		<kor-tabs slot="bottom" style="justify-content: center; width: 100svw">
			<kor-tab-item
				label="Editor"
				:active="mobileViewMode === 'editor'"
				@click="mobileViewMode = 'editor'"
			></kor-tab-item>
			<kor-tab-item
				label="Preview"
				:active="mobileViewMode === 'preview'"
				@click="mobileViewMode = 'preview'"
			></kor-tab-item>
			<kor-tab-item
				label="Agent"
				:active="mobileViewMode === 'agent'"
				@click="mobileViewMode = 'agent'"
			></kor-tab-item>
		</kor-tabs>
	</template>
</template>

<style scoped>
.editor-pane {
	width: calc(100svw / 3);
	box-sizing: border-box;
}

.mobile-pane {
	width: 100svw;
	box-sizing: border-box;
}
</style>
