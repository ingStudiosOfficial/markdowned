import { getSettings, saveSettings } from '@/db';
import type { Settings } from '@/interfaces/Settings';
import { ref, toRaw } from 'vue';

const settings = ref<Settings | null>(null);

export function useSettings() {
	async function getAndSetSettings() {
		settings.value = await getSettings();
		console.log('Settings:', settings.value);
	}

	async function setSettings() {
		if (!settings.value) return;
		console.log('Setting settings:', settings.value);
		await saveSettings(toRaw(settings.value));
	}

	return { settings, getAndSetSettings, setSettings };
}
