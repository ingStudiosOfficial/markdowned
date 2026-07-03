import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import '@kor-ui/kor';
import '@kor-ui/kor/kor-styles.css';
import '@/assets/main.css';
import { useCode } from './stores/code.ts';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

const codeStore = useCode();

if ('launchQueue' in window) {
	window.launchQueue?.setConsumer(async (launchParams) => {
		if (launchParams.files.length === 0 || !launchParams.files[0]) return;

		const handle = launchParams.files[0];
		if (handle.kind !== 'file') return;

		const file = await (handle as FileSystemFileHandle).getFile();
		codeStore.code = await file.text();
		codeStore.filename = file.name;

		router.replace({ name: 'editor' });
	});
}
