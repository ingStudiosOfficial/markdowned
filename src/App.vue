<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
	<kor-page class="page">
		<kor-app-bar slot="top" label="markdowned"></kor-app-bar>
		<kor-nav-bar slot="top">
			<kor-tabs>
				<kor-tab-item label="Editor"></kor-tab-item>
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
