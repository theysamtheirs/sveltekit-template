<script lang="ts">
	import { getSEOTags, type SEOProps } from '$lib/utils/seo';
	import { page } from '$app/stores';

	type Props = SEOProps & {
		/** Override canonical URL. If not provided, uses current page URL */
		canonicalOverride?: string;
	};

	let {
		title,
		description,
		image,
		url,
		type,
		noindex,
		nofollow,
		keywords,
		canonicalOverride
	}: Props = $props();

	const seo = getSEOTags({
		title,
		description,
		image,
		url: url || $page.url.pathname,
		type,
		noindex,
		nofollow,
		keywords
	});

	const canonical = canonicalOverride || seo.canonical;
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta name="keywords" content={seo.keywords} />
	<meta name="robots" content={seo.robots} />
	<link rel="canonical" href={canonical} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={seo.ogType} />
	<meta property="og:url" content={seo.ogUrl} />
	<meta property="og:title" content={seo.ogTitle} />
	<meta property="og:description" content={seo.ogDescription} />
	<meta property="og:image" content={seo.ogImage} />
	<meta property="og:site_name" content="SvelteKit Template" />

	<!-- Twitter -->
	<meta name="twitter:card" content={seo.twitterCard} />
	<meta name="twitter:title" content={seo.twitterTitle} />
	<meta name="twitter:description" content={seo.twitterDescription} />
	<meta name="twitter:image" content={seo.twitterImage} />

	<!-- Theme Color -->
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />

	<!-- Additional Meta Tags -->
	<meta name="language" content="en" />
	<meta name="revisit-after" content="7 days" />

	<!-- Mobile Optimizations -->
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

	<!-- Note: Security headers (X-Content-Type-Options, X-Frame-Options, etc.) -->
	<!-- should be set in server configuration (Vercel, headers.ts, or hooks.server.ts) -->
	<!-- not in meta tags, as they are HTTP headers, not HTML meta tags -->
</svelte:head>

