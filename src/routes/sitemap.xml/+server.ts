import type { RequestHandler } from './$types';

const siteUrl = 'https://your-site.com'; // Users should update this

// List of public routes that should be in the sitemap
const routes = [
	{ url: '', changefreq: 'weekly', priority: 1.0 },
	{ url: '/sign-in', changefreq: 'monthly', priority: 0.5 },
	{ url: '/sign-up', changefreq: 'monthly', priority: 0.5 }
	// Add more public routes as needed
];

export const GET: RequestHandler = async () => {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
	.map(
		(route) => `  <url>
    <loc>${siteUrl}${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
};

