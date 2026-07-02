<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import router from './router';
import { useSettings } from './composables/settings';
import { onMounted } from 'vue';

const route = useRoute();

const { getAndSetSettings } = useSettings();

onMounted(async () => {
	await getAndSetSettings();
});
</script>

<template>
	<kor-page class="page">
		<kor-app-bar slot="top" label="markdowned"></kor-app-bar>
		<kor-nav-bar slot="top">
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
