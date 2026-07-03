<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import router from './router';
import { useSettings } from './composables/settings';
import { onMounted } from 'vue';
import { useCode } from './stores/code';
import { useMobile } from './composables/mobile';

const route = useRoute();

const { exportCode, importCode } = useCode();

const { getAndSetSettings } = useSettings();
const { isMobile } = useMobile();

onMounted(async () => {
	await getAndSetSettings();
});
</script>

<template>
	<kor-page class="page">
		<kor-app-bar class="main-app-bar" slot="top" label="markdowned">
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
	</kor-page>
</template>

<style scoped>
.page {
	width: 100svw;
	height: 100svh;
}
</style>
