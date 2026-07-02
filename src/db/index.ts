import type { Settings } from '@/interfaces/Settings';
import { openDB, type IDBPDatabase } from 'idb';

async function getDb(): Promise<IDBPDatabase<unknown>> {
	const dbName = import.meta.env.VITE_IDB_NAME;
	const dbVer = Number(import.meta.env.VITE_IDB_VER);

	const db = await openDB(dbName, dbVer, {
		upgrade(db, oldVersion) {
			switch (oldVersion) {
				case 0:
					if (!db.objectStoreNames.contains('settings')) {
						db.createObjectStore('settings');
					}
			}
		},
	});

	return db;
}

export async function saveSettings(settings: Settings) {
	const db = await getDb();
	await db.put('settings', settings, 'settings');
}

export async function getSettings(): Promise<Settings> {
	const db = await getDb();
	const settings = await db.get('settings', 'settings');
	return settings || { aiEnabled: false };
}
