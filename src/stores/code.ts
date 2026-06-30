import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCode = defineStore('code', () => {
	const code = ref<string>('');

	return { code };
});
