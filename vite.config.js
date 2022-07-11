import { defineConfig } from 'vite';

process.env.BROWSER = 'firefox';

export default defineConfig({
	root: './src',
	base: './',
	build: {
		outDir: '../dist'
	},
	server: {
		open: '/index.html'
	}
});
