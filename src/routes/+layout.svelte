<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navigation from '$lib/components/Navigation.svelte';
	import SkipToContent from '$lib/components/SkipToContent.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import type { LayoutData } from './$types';
	import type { SEOProps } from '$lib/utils/seo';

	type LayoutDataWithSEO = LayoutData & {
		seo?: SEOProps & { skipDefault?: boolean };
	};

	let { children, data }: { children: any; data: LayoutDataWithSEO } = $props();

	// Default SEO - can be overridden by child pages via data.seo
	// Only render if seo data is provided and skipDefault is not true
	const shouldRenderSEO = data.seo && !data.seo.skipDefault;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

{#if shouldRenderSEO && data.seo}
	<SEO {...data.seo} />
{/if}

<SkipToContent />
<ModeWatcher />
<Navigation user={data.user} />
<main id="main-content" tabindex="-1">
	{@render children()}
</main>
