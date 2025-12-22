export type SEOProps = {
	title?: string;
	description?: string;
	image?: string;
	url?: string;
	type?: 'website' | 'article' | 'profile';
	noindex?: boolean;
	nofollow?: boolean;
	keywords?: string;
	/** Skip default SEO rendering in layout (use when page provides its own SEO component) */
	skipDefault?: boolean;
};

const defaultTitle = 'SvelteKit Template - Production-Ready Starter';
const defaultDescription =
	'A production-ready SvelteKit template with authentication, database, beautiful UI components, and deployment configuration — all set up and ready to go.';
const defaultImage = '/favicon.svg';
const siteUrl = 'https://your-site.com'; // Users should update this
const defaultKeywords = 'SvelteKit, Svelte, TypeScript, Tailwind CSS, Vercel, Turso, Drizzle ORM';

/**
 * Get SEO metadata for use in svelte:head
 * Returns an object with all necessary meta tags
 */
export function getSEOTags(props: SEOProps = {}): {
	title: string;
	description: string;
	keywords: string;
	ogTitle: string;
	ogDescription: string;
	ogImage: string;
	ogUrl: string;
	ogType: string;
	twitterCard: string;
	twitterTitle: string;
	twitterDescription: string;
	twitterImage: string;
	robots: string;
	canonical: string;
} {
	const {
		title = defaultTitle,
		description = defaultDescription,
		image = defaultImage,
		url,
		type = 'website',
		noindex = false,
		nofollow = false,
		keywords = defaultKeywords
	} = props;

	const fullTitle = title.includes('SvelteKit Template') ? title : `${title} | SvelteKit Template`;
	const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
	const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

	const robots = [
		noindex ? 'noindex' : 'index',
		nofollow ? 'nofollow' : 'follow',
		'max-snippet:-1',
		'max-image-preview:large',
		'max-video-preview:-1'
	].join(', ');

	return {
		title: fullTitle,
		description,
		keywords,
		ogTitle: fullTitle,
		ogDescription: description,
		ogImage: fullImage,
		ogUrl: fullUrl,
		ogType: type,
		twitterCard: 'summary_large_image',
		twitterTitle: fullTitle,
		twitterDescription: description,
		twitterImage: fullImage,
		robots,
		canonical: fullUrl
	};
}

