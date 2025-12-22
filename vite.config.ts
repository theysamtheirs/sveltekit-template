import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
	build: {
		// Optimize chunk splitting for better caching
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					// Separate vendor chunks for better caching
					if (id.includes('node_modules')) {
						if (id.includes('svelte')) {
							return 'vendor-svelte';
						}
						if (id.includes('bits-ui') || id.includes('@lucide/svelte')) {
							return 'vendor-ui';
						}
						return 'vendor';
					}
				}
			}
		},
		// Optimize asset inlining threshold (4KB)
		assetsInlineLimit: 4096,
		// Enable source maps for production debugging (set to false for smaller builds)
		sourcemap: false
	},
	// Optimize dependencies
	optimizeDeps: {
		include: ['svelte', 'bits-ui']
	}
});
