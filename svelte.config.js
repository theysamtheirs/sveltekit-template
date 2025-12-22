import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({ runtime: 'nodejs22.x' })
		// Note: URL normalization (trailing slashes) is handled automatically by SvelteKit
		// SvelteKit 2.x normalizes URLs to prevent duplicate content issues
	}
};

export default config;
