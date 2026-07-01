import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag) => tag.includes('kor-'),
				},
			},
		}),
		vueDevTools(),
		{
			name: 'ignore-web-llm',
			transform(code, id) {
				if (id.includes('@mlc-ai/web-llm') || id.includes('web-llm')) {
					return { code: 'export default {};', map: null };
				}
			},
		},
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	optimizeDeps: {
		exclude: ['@mlc-ai/web-llm', 'web-llm'],
		esbuildOptions: {
			target: 'esnext',
			supported: {
				'top-level-await': true,
			},
		},
	},
	build: {
		target: 'esnext',
		rollupOptions: {
			external: ['@mlc-ai/web-llm', 'web-llm'],
		},
	},
});
