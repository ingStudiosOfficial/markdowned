import EditorView from '@/views/EditorView.vue';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{ path: '/', redirect: '/editor' },
	{ name: 'editor', path: '/editor', component: EditorView },
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: routes,
});

export default router;
