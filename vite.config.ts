import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import { VitePWA } from 'vite-plugin-pwa';

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
		VitePWA({
			registerType: 'autoUpdate',
			strategies: 'generateSW',
			manifest: {
				short_name: 'markdowned',
				name: 'markdowned',
				description: 'A simple web based Markdown editor with agentic AI features.',
				icons: [
					{
						src: 'logo_full_trans.png',
						sizes: '500x500',
						type: 'image/png',
						purpose: 'any',
					},
					{
						src: 'logo_trans.png',
						sizes: '500x500',
						type: 'image/png',
						purpose: 'maskable',
					},
					{
						src: 'logo_full_trans.png',
						sizes: '500x500',
						type: 'image/png',
						purpose: 'monochrome',
					},
				],
				file_handlers: [
					{
						action: '/',
						accept: {
							'text/markdown': ['.md'],
						},
						launch_type: 'multiple-clients',
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
					} as any,
				],
				start_url: '/',
				display: 'standalone',
				theme_color: '#FFFFFF',
				background_color: '#FFFFFF',
				categories: ['productivity', 'utilities'],
			},
			srcDir: 'src/',
			includeAssets: ['public/*'],
			workbox: {
				globPatterns: ['**/*.{html,css,js,png,svg,ico,json}'],
				globDirectory: 'dist',
				cacheId: 'v1.0.1',
				cleanupOutdatedCaches: true,
				clientsClaim: true,
				skipWaiting: true,
				navigateFallback: '/index.html',
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'google-fonts-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365,
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
					{
						urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'gstatic-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365,
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
				],
			},
			devOptions: {
				enabled: true,
				type: 'module',
			},
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
