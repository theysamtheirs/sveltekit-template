# Accessibility & SEO Guide

This template includes comprehensive accessibility and SEO best practices out of the box. This document explains what's implemented and how to use it.

## 🎯 Overview

This template follows **WCAG 2.1 Level AA** guidelines and implements modern SEO best practices to ensure your site is:

- ✅ Accessible to users with disabilities
- ✅ Optimized for search engines
- ✅ Performant and well-scoring
- ✅ Ready for production use

## ♿ Accessibility Features

### Keyboard Navigation

- **Skip to Content Link**: Added at the top of every page for keyboard users to skip navigation
- **Focus Management**: All interactive elements have visible focus indicators
- **Tab Order**: Logical tab order throughout the application
- **Keyboard Shortcuts**: Forms support standard keyboard navigation

### ARIA Labels & Roles

- **Navigation Landmarks**: Main navigation has proper `role="navigation"` and `aria-label`
- **Form Labels**: All form inputs are properly labeled with associated `<label>` elements
- **Error Announcements**: Form errors use `aria-live="assertive"` for screen reader announcements
- **Button Labels**: Icon-only buttons have descriptive `aria-label` attributes
- **User Menu**: Dropdown menus have proper ARIA labels

### Form Accessibility

- **Error Messages**: Connected to inputs via `aria-describedby`
- **Invalid States**: Inputs use `aria-invalid` when errors are present
- **Required Fields**: Properly marked with `required` attribute
- **Autocomplete**: Form inputs use appropriate `autocomplete` values
- **Validation Feedback**: Real-time validation with accessible error messages

### Visual Accessibility

- **Focus Indicators**: Clear, visible focus rings on all interactive elements
- **Color Contrast**: All text meets WCAG AA contrast requirements
- **Screen Reader Text**: Hidden but accessible text for screen readers (`.sr-only` class)
- **Image Alt Text**: All images have descriptive alt text

### Semantic HTML

- **Proper Headings**: Logical heading hierarchy (h1 → h2 → h3)
- **Landmark Elements**: Use of `<nav>`, `<main>`, `<section>` for structure
- **List Elements**: Proper use of `<ul>`, `<ol>` for lists

## 🔍 SEO Features

### Meta Tags

Every page includes comprehensive meta tags:

- **Title Tags**: Unique, descriptive titles for each page
- **Meta Descriptions**: Compelling descriptions for search results
- **Keywords**: Relevant keywords (customizable per page)
- **Robots Meta**: Control over indexing and crawling
- **Canonical URLs**: Prevent duplicate content issues

### Open Graph Tags

Social media sharing is optimized with:

- **og:title**: Page title for social shares
- **og:description**: Page description
- **og:image**: Social sharing image
- **og:url**: Canonical URL
- **og:type**: Content type (website, article, etc.)
- **og:site_name**: Site name

### Twitter Cards

Twitter sharing includes:

- **twitter:card**: Card type (summary_large_image)
- **twitter:title**: Title for Twitter
- **twitter:description**: Description
- **twitter:image**: Image for Twitter cards

### Structured Data (JSON-LD)

- **WebSite Schema**: Homepage includes structured data for better search understanding
- **Easy to Extend**: Add more schema types (Article, Product, etc.) as needed

### Technical SEO

- **Sitemap.xml**: Auto-generated sitemap at `/sitemap.xml`
- **Robots.txt**: Properly configured with sitemap reference
- **Theme Color**: Meta tags for mobile browser theming
- **Viewport**: Responsive viewport configuration
- **Preconnect**: Performance optimization for external resources

## 📝 How to Use

### Adding SEO to a New Page

**Option 1: Using SEO Component (Recommended for most pages)**

Use the `<SEO>` component directly in your page:

```svelte
<script lang="ts">
	import SEO from '$lib/components/SEO.svelte';
</script>

<SEO
	title="My Page Title"
	description="A compelling description of this page"
	url="/my-page"
	keywords="keyword1, keyword2, keyword3"
/>
```

**Option 2: Using Layout-Based SEO (Recommended for dynamic content)**

For dynamic routes (like blog posts), provide SEO data via the load function:

```typescript
// src/routes/blog/[slug]/+page.server.ts
import type { PageServerLoad } from './$types';
import type { SEOProps } from '$lib/utils/seo';

export const load: PageServerLoad = async ({ params }) => {
  const post = await fetchPost(params.slug);

  return {
    post,
    // SEO data will be automatically used by layout
    seo: {
      title: post.title,
      description: post.excerpt,
      image: post.featuredImage,
      url: `/blog/${params.slug}`,
      type: 'article',
      keywords: post.tags?.join(', ')
    } as SEOProps
  };
};
```

The layout will automatically render SEO tags. If you need to skip layout SEO and use your own component, set `skipDefault: true`:

```typescript
return {
  seo: {
    skipDefault: true // Layout won't render SEO, use your own component
  }
};
```

**Available Props:**

- `title` (string): Page title (defaults to site title)
- `description` (string): Meta description
- `url` (string): Page URL path (e.g., "/about")
- `image` (string): Social sharing image (defaults to favicon)
- `type` (string): Open Graph type - "website" | "article" | "profile"
- `noindex` (boolean): Prevent search engine indexing
- `nofollow` (boolean): Prevent following links
- `keywords` (string): Comma-separated keywords

### Adding Structured Data

Add JSON-LD structured data in `svelte:head`:

```svelte
<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: 'Article Title',
		author: {
			'@type': 'Person',
			name: 'Author Name'
		}
	})}</script>`}
</svelte:head>
```

### Updating Sitemap

Edit `src/routes/sitemap.xml/+server.ts` to add new public routes:

```typescript
const routes = [
  { url: '', changefreq: 'weekly', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  // Add your routes here
];
```

### Configuring Site URL

Update the site URL in these files:

1. **`src/lib/utils/seo.ts`**: Update `siteUrl` constant
2. **`src/routes/sitemap.xml/+server.ts`**: Update `siteUrl` constant
3. **`static/robots.txt`**: Update sitemap URL

### Making Forms Accessible

Forms automatically include accessibility features. Ensure you:

1. **Use Label Component**: Always use `<Label>` with `for` attribute
2. **Connect Errors**: Use `aria-describedby` to connect error messages
3. **Mark Invalid**: Use `aria-invalid="true"` when errors exist
4. **Provide Feedback**: Use `role="alert"` for error messages

Example:

```svelte
<div class="space-y-2">
	<Label for="email">Email</Label>
	<Input
		id="email"
		name="email"
		type="email"
		aria-describedby={hasError ? 'email-error' : undefined}
		aria-invalid={hasError ? 'true' : undefined}
	/>
	{#if hasError}
		<p id="email-error" class="text-xs text-destructive" role="alert">
			{errorMessage}
		</p>
	{/if}
</div>
```

## 🎨 Customization

### Focus Styles

Focus styles are defined in `src/app.css`. Customize the focus ring:

```css
*:focus-visible {
	outline: 2px solid var(--ring);
	outline-offset: 2px;
}
```

### Screen Reader Utilities

Use the `.sr-only` class for screen reader-only text:

```svelte
<span class="sr-only">This text is only visible to screen readers</span>
```

### Skip Link Styling

The skip-to-content link is styled in `src/lib/components/SkipToContent.svelte`. Customize as needed.

## ✅ Checklist for New Pages

When creating a new page, ensure:

- [ ] Add `<SEO>` component with appropriate props
- [ ] Use proper heading hierarchy (h1 → h2 → h3)
- [ ] Add semantic HTML elements (`<section>`, `<article>`, etc.)
- [ ] Include alt text for all images
- [ ] Ensure all interactive elements are keyboard accessible
- [ ] Add ARIA labels for icon-only buttons
- [ ] Test with keyboard navigation (Tab key)
- [ ] Test with screen reader (VoiceOver, NVDA, or JAWS)
- [ ] Verify focus indicators are visible
- [ ] Check color contrast ratios

## 🧪 Testing Accessibility

### Automated Testing

1. **Lighthouse**: Run Lighthouse audit in Chrome DevTools
   - Target: 90+ accessibility score
   - Check for ARIA issues, color contrast, etc.

2. **axe DevTools**: Browser extension for accessibility testing
   - Install from Chrome/Firefox extension store
   - Run on each page

3. **WAVE**: Web accessibility evaluation tool
   - Use browser extension or online tool
   - Identifies accessibility issues

### Manual Testing

1. **Keyboard Navigation**:
   - Tab through entire page
   - Ensure focus is visible
   - Verify logical tab order
   - Test skip-to-content link

2. **Screen Reader Testing**:
   - **macOS**: VoiceOver (Cmd + F5)
   - **Windows**: NVDA (free) or JAWS
   - Navigate page and verify announcements

3. **Color Contrast**:
   - Use browser DevTools to check contrast ratios
   - Ensure text meets WCAG AA (4.5:1 for normal text)

## 📊 Performance & SEO Scores

This template is optimized for:

- **Lighthouse Performance**: 90+ score
- **Lighthouse Accessibility**: 100 score
- **Lighthouse SEO**: 100 score
- **Lighthouse Best Practices**: 90+ score

### Performance Optimizations

- **Preconnect/DNS-prefetch**: Resource hints for faster external resource loading
- **Lazy loading images**: `loading="lazy"` on all images
- **Optimized font loading**: Efficient font loading strategies
- **Efficient CSS**: Tailwind v4 with optimized builds
- **Server-side rendering**: SvelteKit SSR by default
- **Code splitting**: Optimized chunk splitting for better caching
- **Asset optimization**: Inline small assets, optimize larger ones
- **Trailing slash normalization**: Prevents duplicate URL issues

## 🔗 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Accessibility Checklist](https://webaim.org/standards/wcag/checklist)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)

## 🚀 Advanced Features

### Layout-Based SEO

The root layout supports automatic SEO rendering from page load functions. This is especially useful for dynamic routes:

```typescript
// In any +page.server.ts
export const load: PageServerLoad = async ({ params }) => {
  return {
    // Your page data
    content: await getContent(),

    // SEO data - automatically rendered by layout
    seo: {
      title: 'Dynamic Page Title',
      description: 'Page description',
      url: `/path/${params.id}`,
      type: 'article'
    }
  };
};
```

### Trailing Slash Configuration

URLs are normalized to prevent duplicate content issues. Configured in `svelte.config.js`:

- `trailingSlash: 'never'` - No trailing slashes (current setting)
- `trailingSlash: 'always'` - All URLs end with `/`
- `trailingSlash: 'ignore'` - Allow both (not recommended)

### Build Optimizations

The Vite config includes:

- **Manual chunk splitting**: Separates vendor code for better caching
- **Asset inlining**: Small assets (<4KB) are inlined
- **Dependency optimization**: Pre-bundles common dependencies

### Additional Meta Tags

The SEO component includes:

- Language and revisit-after meta tags
- Mobile web app capabilities

**Note**: Security headers (X-Content-Type-Options, X-Frame-Options, CSP, etc.) should be set in server configuration, not meta tags. For Vercel, use `vercel.json` or middleware. For other platforms, configure in your server/hosting settings.

## 📝 Notes

- **Site URL**: Remember to update the site URL in `seo.ts`, `sitemap.xml/+server.ts`, and `robots.txt`
- **Twitter Handle**: Update Twitter creator handle in `SEO.svelte` if needed
- **Structured Data**: Add more schema types as your site grows (Article, Product, Organization, etc.)
- **Sitemap**: Keep sitemap updated as you add new public pages
- **Testing**: Regularly test accessibility as you add new features
- **Layout SEO**: Use `skipDefault: true` in seo data if you want to use your own SEO component

---

**Remember**: Accessibility and SEO are ongoing processes. Regularly audit your site and keep up with best practices!
