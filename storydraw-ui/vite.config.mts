import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from '@svgr/rollup';

export default defineConfig({
	server: {
		host: true,
		port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
	},
	plugins: [react(), svgr()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	build: {
		rollupOptions: {
			input: path.resolve(__dirname, 'src/index.tsx'),
		},
	},
	test: {
		environment: 'jsdom',
		globals: true,
	},
});
