<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import router from './router';
import { useSettings } from './composables/settings';
import { onMounted } from 'vue';
import { useCode } from './stores/code';
import { useMobile } from './composables/mobile';
import NameDialog from './components/dialogs/NameDialog.vue';
import { useDialog } from './composables/dialog.ts';

const route = useRoute();

const { exportCode, importCode, printCode: printMarkdown } = useCode();

const { getAndSetSettings } = useSettings();
const { isMobile } = useMobile();
const { nameDialog } = useDialog();

function toggleDialog() {
	if (nameDialog.value) {
		nameDialog.value.visible = !nameDialog.value.visible;
	}
}

onMounted(async () => {
	await getAndSetSettings();
});
</script>

<template>
	<kor-page class="page">
		<kor-app-bar class="main-app-bar" slot="top" label="markdowned">
			<kor-button
				id="rename-md"
				slot="functions"
				icon="edit"
				color="tertiary"
				@click="toggleDialog()"
			></kor-button>
			<kor-button
				id="print-md"
				slot="functions"
				icon="print"
				color="tertiary"
				@click="printMarkdown()"
			></kor-button>
			<kor-button
				slot="functions"
				label="Import"
				icon="file_upload"
				color="secondary"
				@click="importCode()"
			></kor-button>
			<kor-button
				slot="functions"
				label="Export"
				icon="file_download"
				color="primary"
				@click="exportCode()"
			></kor-button>
		</kor-app-bar>
		<kor-tooltip target="#print-md" position="bottom">Print Markdown document</kor-tooltip>
		<kor-tooltip target="#rename-md" position="bottom">Rename Markdown document</kor-tooltip>
		<kor-nav-bar v-if="!isMobile" slot="top">
			<kor-tabs>
				<kor-tab-item
					label="Editor"
					:active="route.name === 'editor'"
					@click="router.push('/editor')"
				></kor-tab-item>
			</kor-tabs>
		</kor-nav-bar>
		<RouterView></RouterView>
		<NameDialog></NameDialog>
	</kor-page>
</template>

<style scoped>
.page {
	width: 100svw;
	height: 100svh;
}
</style>
