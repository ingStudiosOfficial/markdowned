import { printOutput } from '@/utils/print';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import mime from 'mime';
import { shareMarkdown } from '@/utils/share';

export const useCode = defineStore('code', () => {
	const code = ref<string>('');
	const filename = ref<string>(`${Date.now()}.md`);

	let fileUploadInput: HTMLInputElement | null = null;

	function exportCode() {
		const file = new File([code.value], filename.value, {
			type: mime.getType(filename.value) || 'text/markdown',
		});
		const url = URL.createObjectURL(file);

		const a = document.createElement('a');
		a.href = url;
		a.download = filename.value;
		a.click();

		a.remove();
		URL.revokeObjectURL(url);
	}

	async function importCode() {
		fileUploadInput = document.createElement('input');
		fileUploadInput.type = 'file';
		fileUploadInput.accept = '.md, .txt, .html';

		fileUploadInput.click();

		fileUploadInput.addEventListener('input', onUpload);
	}

	async function onUpload() {
		const file = fileUploadInput?.files?.[0];
		if (!file) {
			throw new Error('file missing');
		}

		code.value = await file.text();

		filename.value = file.name;

		fileUploadInput?.removeEventListener('input', onUpload);
		fileUploadInput?.remove();
	}

	async function printCode() {
		await printOutput(code.value);
	}

	function rename(name: string) {
		filename.value = name;
	}

	async function share() {
		await shareMarkdown(code.value, filename.value);
	}

	return { code, filename, exportCode, importCode, printCode, rename, share };
});
