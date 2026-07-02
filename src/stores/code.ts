import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCode = defineStore('code', () => {
	const code = ref<string>('');

	let fileUploadInput: HTMLInputElement | null = null;

	function exportCode() {
		const filename = `${Date.now()}.md`;
		const file = new File([code.value], filename, {
			type: 'text/markdown',
		});
		const url = URL.createObjectURL(file);

		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		a.click();

		a.remove();
		URL.revokeObjectURL(url);
	}

	async function importCode() {
		fileUploadInput = document.createElement('input');
		fileUploadInput.type = 'file';
		fileUploadInput.accept = '.md';

		fileUploadInput.click();

		fileUploadInput.addEventListener('input', onUpload);
	}

	async function onUpload() {
		const file = fileUploadInput?.files?.[0];
		if (!file) {
			throw new Error('file missing');
		}

		code.value = await file.text();

		fileUploadInput?.removeEventListener('input', onUpload);
		fileUploadInput?.remove();
	}

	return { code, exportCode, importCode };
});
