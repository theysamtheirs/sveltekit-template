<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import SEO from '$lib/components/SEO.svelte';
	import githubLight from '$lib/assets/logos/github-mark-light.svg';
	import githubDark from '$lib/assets/logos/github-mark-dark.svg';
	import tursoLight from '$lib/assets/logos/turso-logo-light.svg';
	import tursoDark from '$lib/assets/logos/turso-logo-dark.svg';
	import vercelLight from '$lib/assets/logos/vercel-logotype-light.svg';
	import vercelDark from '$lib/assets/logos/vercel-logotype-dark.svg';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SEO
	title="SvelteKit Template - Production-Ready Starter"
	description="A production-ready SvelteKit template with authentication, database, beautiful UI components, and deployment configuration — all set up and ready to go."
	url="/"
/>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'SvelteKit Template',
		description:
			'A production-ready SvelteKit template with authentication, database, beautiful UI components, and deployment configuration',
		url: 'https://your-site.com'
	})}</script>`}
</svelte:head>

<div class="flex min-h-[calc(100vh-4rem)] flex-col">
	<!-- Hero Section -->
	<section class="flex flex-1 flex-col items-center justify-center px-4 py-16">
		<div class="mx-auto max-w-4xl text-center">
			<div class="mb-4 flex items-center justify-center gap-2">
				<span class="icon-[lucide--rocket] text-4xl text-primary sm:text-5xl"></span>
			</div>
			<h1 class="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
				Build Fast. Ship Faster.
			</h1>
			<p class="mb-4 text-xl leading-8 text-muted-foreground sm:text-2xl">
				A production-ready SvelteKit template with everything you need to launch your next
				application in minutes, not hours.
			</p>
			<p class="mb-8 text-lg leading-8 text-muted-foreground">
				Authentication, database, beautiful UI components, and deployment configuration — all set up
				and ready to go.
			</p>
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				{#if data.user}
					<Button href="/dashboard" size="lg">
						<span class="mr-2 icon-[lucide--layout-dashboard]"></span>
						Go to Dashboard
					</Button>
				{:else}
					<Button
						href="https://github.com/theysamtheirs/sveltekit-template"
						target="_blank"
						rel="noopener noreferrer"
						size="lg"
					>
						<span class="mr-2 icon-[lucide--github]"></span>
						View on GitHub
					</Button>
					<Button
						href="https://github.com/theysamtheirs/sveltekit-template"
						target="_blank"
						rel="noopener noreferrer"
						variant="outline"
						size="lg"
					>
						<span class="mr-2 icon-[lucide--star]"></span>
						Star Template
					</Button>
				{/if}
			</div>
		</div>
	</section>

	<!-- Prerequisites Section -->
	<section class="border-t py-16">
		<div class="container mx-auto max-w-6xl px-4">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold">What You'll Need</h2>
				<p class="text-lg text-muted-foreground">
					Get these accounts set up before you start (all free to get started)
				</p>
			</div>
			<div class="grid gap-6 md:grid-cols-3">
				<Card>
					<CardHeader>
						<div class="mb-4 flex items-center justify-center">
							<a
								href="https://github.com/signup"
								target="_blank"
								rel="noopener noreferrer"
								class="rounded transition-opacity hover:opacity-80 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
								aria-label="GitHub - Create an account (opens in new tab)"
							>
								<img
									src={githubLight}
									alt="GitHub logo"
									class="h-12 dark:hidden"
									loading="lazy"
									width="48"
									height="48"
								/>
								<img
									src={githubDark}
									alt="GitHub logo"
									class="hidden h-12 dark:block"
									loading="lazy"
									width="48"
									height="48"
								/>
							</a>
						</div>
						<CardTitle>GitHub Account</CardTitle>
						<CardDescription>For version control and deployment</CardDescription>
					</CardHeader>
					<CardContent>
						<p class="mb-4 text-sm text-muted-foreground">
							You'll need a GitHub account to store your code and enable automatic deployments.
						</p>
						<a
							href="https://github.com/signup"
							target="_blank"
							rel="noopener noreferrer"
							class="text-sm font-medium text-primary hover:underline"
						>
							Create GitHub account →
						</a>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div class="mb-4 flex items-center justify-center">
							<a
								href="https://turso.tech"
								target="_blank"
								rel="noopener noreferrer"
								class="rounded transition-opacity hover:opacity-80 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
								aria-label="Turso - Database service (opens in new tab)"
							>
								<img
									src={tursoLight}
									alt="Turso logo"
									class="h-12 dark:hidden"
									loading="lazy"
									width="48"
									height="48"
								/>
								<img
									src={tursoDark}
									alt="Turso logo"
									class="hidden h-12 dark:block"
									loading="lazy"
									width="48"
									height="48"
								/>
							</a>
						</div>
						<CardTitle>Turso Account</CardTitle>
						<CardDescription>For your production database</CardDescription>
					</CardHeader>
					<CardContent>
						<p class="mb-4 text-sm text-muted-foreground">
							Turso provides a fast, serverless SQLite database. Free tier includes 500 databases.
						</p>
						<a
							href="https://turso.tech"
							target="_blank"
							rel="noopener noreferrer"
							class="text-sm font-medium text-primary hover:underline"
						>
							Sign up for Turso →
						</a>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div class="mb-4 flex items-center justify-center">
							<a
								href="https://vercel.com/signup"
								target="_blank"
								rel="noopener noreferrer"
								class="rounded transition-opacity hover:opacity-80 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
								aria-label="Vercel - Hosting and deployment (opens in new tab)"
							>
								<img
									src={vercelLight}
									alt="Vercel logo"
									class="h-8 max-w-32 dark:hidden"
									loading="lazy"
									width="128"
									height="32"
								/>
								<img
									src={vercelDark}
									alt="Vercel logo"
									class="hidden h-8 max-w-32 dark:block"
									loading="lazy"
									width="128"
									height="32"
								/>
							</a>
						</div>
						<CardTitle>Vercel Account</CardTitle>
						<CardDescription>For hosting and deployment</CardDescription>
					</CardHeader>
					<CardContent>
						<p class="mb-4 text-sm text-muted-foreground">
							Vercel offers seamless deployment with automatic previews. Free tier is perfect for
							getting started.
						</p>
						<a
							href="https://vercel.com/signup"
							target="_blank"
							rel="noopener noreferrer"
							class="text-sm font-medium text-primary hover:underline"
						>
							Sign up for Vercel →
						</a>
					</CardContent>
				</Card>
			</div>
		</div>
	</section>

	<!-- Quick Start Section -->
	<section class="border-t bg-muted/30 py-16">
		<div class="container mx-auto max-w-6xl px-4">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold">Get Started in 3 Steps</h2>
				<p class="text-lg text-muted-foreground">From zero to deployed in under 5 minutes</p>
			</div>
			<div class="grid gap-6 md:grid-cols-3">
				<Card>
					<CardHeader>
						<div
							class="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-2xl font-bold text-primary-foreground"
						>
							1
						</div>
						<CardTitle>Install & Setup</CardTitle>
						<CardDescription
							>Clone, install dependencies, and run the automated setup</CardDescription
						>
					</CardHeader>
					<CardContent>
						<div class="space-y-2 font-mono text-sm">
							<p class="text-muted-foreground">$ git clone &lt;repo&gt;</p>
							<p class="text-muted-foreground">$ npm install</p>
							<p class="font-semibold text-foreground">$ npm run setup</p>
						</div>
						<p class="mt-4 text-sm text-muted-foreground">
							The setup script automatically creates your database, configures environment
							variables, and pushes the schema. Just answer a few prompts!
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div
							class="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-2xl font-bold text-primary-foreground"
						>
							2
						</div>
						<CardTitle>Start Building</CardTitle>
						<CardDescription>Start the dev server and begin coding</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="space-y-2 font-mono text-sm">
							<p class="font-semibold text-foreground">$ npm run dev</p>
						</div>
						<p class="mt-4 text-sm text-muted-foreground">
							Everything is already configured: authentication, database, UI components, and
							routing. Just start building your features!
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div
							class="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-2xl font-bold text-primary-foreground"
						>
							3
						</div>
						<CardTitle>Deploy to Vercel</CardTitle>
						<CardDescription>Push to GitHub and deploy with one click</CardDescription>
					</CardHeader>
					<CardContent>
						<div class="space-y-2 font-mono text-sm">
							<p class="text-muted-foreground">$ git push</p>
							<p class="font-semibold text-foreground">→ Connect to Vercel</p>
						</div>
						<p class="mt-4 text-sm text-muted-foreground">
							Vercel adapter is pre-configured. Just add your environment variables and deploy. The
							setup script even provides the exact values to copy!
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="border-t py-16">
		<div class="container mx-auto max-w-6xl px-4">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold">Everything You Need, Nothing You Don't</h2>
				<p class="text-lg text-muted-foreground">Production-ready features without the bloat</p>
			</div>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader>
						<div class="mb-4 flex items-center justify-center">
							<span class="icon-[lucide--lock] text-4xl text-primary"></span>
						</div>
						<CardTitle>Authentication</CardTitle>
						<CardDescription>Secure user authentication out of the box</CardDescription>
					</CardHeader>
					<CardContent>
						<ul class="space-y-2 text-sm text-muted-foreground">
							<li>• User registration & login</li>
							<li>• Argon2 password hashing</li>
							<li>• Secure session management</li>
							<li>• Protected route helpers</li>
						</ul>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div class="mb-4 flex items-center justify-center">
							<span class="icon-[lucide--database] text-4xl text-primary"></span>
						</div>
						<CardTitle>Database Ready</CardTitle>
						<CardDescription>Turso + Drizzle ORM configured</CardDescription>
					</CardHeader>
					<CardContent>
						<ul class="space-y-2 text-sm text-muted-foreground">
							<li>• Automated database setup</li>
							<li>• Type-safe database queries</li>
							<li>• Schema migrations included</li>
							<li>• Drizzle Studio for debugging</li>
						</ul>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div class="mb-4 flex items-center justify-center">
							<span class="icon-[lucide--palette] text-4xl text-primary"></span>
						</div>
						<CardTitle>Beautiful UI</CardTitle>
						<CardDescription>shadcn-svelte components included</CardDescription>
					</CardHeader>
					<CardContent>
						<ul class="space-y-2 text-sm text-muted-foreground">
							<li>• Pre-configured components</li>
							<li>• Tailwind CSS v4</li>
							<li>• Dark mode support</li>
							<li>• 275k+ icons via Iconify</li>
						</ul>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div class="mb-4 flex items-center justify-center">
							<span class="icon-[lucide--zap] text-4xl text-primary"></span>
						</div>
						<CardTitle>Lightning Fast</CardTitle>
						<CardDescription>Built on SvelteKit for performance</CardDescription>
					</CardHeader>
					<CardContent>
						<ul class="space-y-2 text-sm text-muted-foreground">
							<li>• Server-side rendering</li>
							<li>• Optimized builds</li>
							<li>• Fast page loads</li>
							<li>• Great developer experience</li>
						</ul>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div class="mb-4 flex items-center justify-center">
							<span class="icon-[lucide--rocket] text-4xl text-primary"></span>
						</div>
						<CardTitle>Deploy Ready</CardTitle>
						<CardDescription>Vercel adapter pre-configured</CardDescription>
					</CardHeader>
					<CardContent>
						<ul class="space-y-2 text-sm text-muted-foreground">
							<li>• One-click deployment</li>
							<li>• Environment variable guide</li>
							<li>• Production optimizations</li>
							<li>• Edge-ready configuration</li>
						</ul>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div class="mb-4 flex items-center justify-center">
							<span class="icon-[lucide--shield-check] text-4xl text-primary"></span>
						</div>
						<CardTitle>Type Safe</CardTitle>
						<CardDescription>Full TypeScript support</CardDescription>
					</CardHeader>
					<CardContent>
						<ul class="space-y-2 text-sm text-muted-foreground">
							<li>• End-to-end type safety</li>
							<li>• Auto-generated types</li>
							<li>• Strict TypeScript config</li>
							<li>• ESLint + Prettier</li>
						</ul>
					</CardContent>
				</Card>
			</div>
		</div>
	</section>

	<!-- Tech Stack Section -->
	<section class="border-t bg-muted/30 py-16">
		<div class="container mx-auto max-w-4xl px-4">
			<div class="mb-8 text-center">
				<h2 class="mb-4 text-3xl font-bold">Built with Modern Tools</h2>
				<p class="text-lg text-muted-foreground">
					Industry-standard technologies for production applications
				</p>
			</div>
			<div class="grid gap-4 sm:grid-cols-2">
				<div class="rounded-lg border bg-card p-4">
					<h3 class="mb-2 font-semibold">Framework & Runtime</h3>
					<p class="text-sm text-muted-foreground">
						<a
							href="https://kit.svelte.dev"
							target="_blank"
							rel="noopener noreferrer"
							class="text-primary hover:underline"
						>
							SvelteKit
						</a>
						{' • '}
						<a
							href="https://nodejs.org"
							target="_blank"
							rel="noopener noreferrer"
							class="text-primary hover:underline"
						>
							Node.js 22
						</a>
						{' • '}
						<a
							href="https://vitejs.dev"
							target="_blank"
							rel="noopener noreferrer"
							class="text-primary hover:underline"
						>
							Vite
						</a>
					</p>
				</div>
				<div class="rounded-lg border bg-card p-4">
					<h3 class="mb-2 font-semibold">Database & ORM</h3>
					<p class="text-sm text-muted-foreground">
						<a
							href="https://turso.tech"
							target="_blank"
							rel="noopener noreferrer"
							class="text-primary hover:underline"
						>
							Turso (LibSQL)
						</a>
						{' • '}
						<a
							href="https://orm.drizzle.team"
							target="_blank"
							rel="noopener noreferrer"
							class="text-primary hover:underline"
						>
							Drizzle ORM
						</a>
					</p>
				</div>
				<div class="rounded-lg border bg-card p-4">
					<h3 class="mb-2 font-semibold">Styling & UI</h3>
					<p class="text-sm text-muted-foreground">
						<a
							href="https://tailwindcss.com"
							target="_blank"
							rel="noopener noreferrer"
							class="text-primary hover:underline"
						>
							Tailwind CSS v4
						</a>
						{' • '}
						<a
							href="https://www.shadcn-svelte.com"
							target="_blank"
							rel="noopener noreferrer"
							class="text-primary hover:underline"
						>
							shadcn-svelte
						</a>
						{' • '}
						<a
							href="https://iconify.design"
							target="_blank"
							rel="noopener noreferrer"
							class="text-primary hover:underline"
						>
							Iconify
						</a>
					</p>
				</div>
				<div class="rounded-lg border bg-card p-4">
					<h3 class="mb-2 font-semibold">Deployment</h3>
					<p class="text-sm text-muted-foreground">
						<a
							href="https://vercel.com"
							target="_blank"
							rel="noopener noreferrer"
							class="text-primary hover:underline"
						>
							Vercel
						</a>
						{' • '}
						<a
							href="https://github.com/features/actions"
							target="_blank"
							rel="noopener noreferrer"
							class="text-primary hover:underline"
						>
							GitHub Actions
						</a>
						{' ready'}
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="border-t py-16">
		<div class="container mx-auto max-w-2xl px-4 text-center">
			<h2 class="mb-4 text-3xl font-bold">Ready to Build Something Great?</h2>
			<p class="mb-8 text-lg text-muted-foreground">
				Start your next project with a solid foundation. No configuration headaches, just code.
			</p>
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				{#if data.user}
					<Button href="/dashboard" size="lg">
						<span class="mr-2 icon-[lucide--layout-dashboard]"></span>
						Go to Dashboard
					</Button>
				{:else}
					<Button
						href="https://github.com/theysamtheirs/sveltekit-template"
						target="_blank"
						rel="noopener noreferrer"
						size="lg"
					>
						<span class="mr-2 icon-[lucide--github]"></span>
						View on GitHub
					</Button>
					<Button
						href="https://github.com/theysamtheirs/sveltekit-template"
						target="_blank"
						rel="noopener noreferrer"
						variant="outline"
						size="lg"
					>
						<span class="mr-2 icon-[lucide--star]"></span>
						Star Template
					</Button>
				{/if}
			</div>
		</div>
	</section>
</div>
