import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';
import react from '@vitejs/plugin-react'
export default defineConfig({
	plugins: [
		react(),
		{
			name: 'create-redirects',
			apply: 'build',
			closeBundle: async () => {
				const filePath = resolve(__dirname, 'dist', '_redirects');
				const content = '/*    /index.html    200';
				try {
					await writeFile(filePath, content);
				} catch (err) {
					console.error(err);
				}
			},
		},
	],
	build: {
		emptyOutDir: true,
	},
	server: {
		host: '0.0.0.0',
	},
	resolve: {
		alias: [
			{
				find: '@components',
				replacement: resolve(__dirname, 'src/components'),
			},
			{
				find: '@pages',
				replacement: resolve(__dirname, 'src/pages'),
			},
			{ find: '@utils', replacement: resolve(__dirname, 'src/utils') },
			{
				find: '@assets',
				replacement: resolve(__dirname, 'src/assets'),
			},
			{
				find: '@public',
				replacement: resolve(__dirname, 'public'),
			},
		],
	},
	css: {
		postcss: {
			plugins: [tailwindcss, autoprefixer],
		},
	},
});