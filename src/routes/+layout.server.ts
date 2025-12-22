import type { LayoutServerLoad } from './$types';
import type { SEOProps } from '$lib/utils/seo';

export const load: LayoutServerLoad = async (event) => {
	return {
		user: event.locals.user,
		// SEO data can be provided by child pages via $page.data
		// Pages can override by setting seo in their +page.server.ts load function
		seo: undefined as (SEOProps & { skipDefault?: boolean }) | undefined
	};
};
