<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex min-h-[calc(100vh-4rem)] flex-col">
	<!-- Hero Section -->
	<section class="flex flex-1 flex-col items-center justify-center px-4 py-16">
		<div class="mx-auto max-w-4xl text-center">
			<h1 class="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
				Build Fast. Ship Faster.
			</h1>
			<p class="mb-4 text-xl leading-8 text-muted-foreground sm:text-2xl">
				A production-ready SvelteKit template with everything you need to launch your next
				application in minutes, not hours.
			</p>
			<p class="mb-8 text-lg leading-8 text-muted-foreground">
				Authentication, database, beautiful UI components, and deployment configuration —
				all set up and ready to go.
			</p>
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				{#if data.user}
					<Button href="/dashboard" size="lg"> Go to Dashboard </Button>
				{:else}
					<Button href="/sign-up" size="lg"> Get Started </Button>
					<Button href="/sign-in" variant="outline" size="lg"> Sign In </Button>
				{/if}
			</div>
		</div>
	</section>

	<!-- Quick Start Section -->
	<section class="border-t bg-muted/30 py-16">
		<div class="container mx-auto max-w-6xl px-4">
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-3xl font-bold">Get Started in 3 Steps</h2>
				<p class="text-lg text-muted-foreground">
					From zero to deployed in under 5 minutes
				</p>
			</div>
			<div class="grid gap-6 md:grid-cols-3">
				<Card>
					<CardHeader>
						<div class="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-2xl font-bold text-primary-foreground">
							1
						</div>
						<CardTitle>Install & Setup</CardTitle>
						<CardDescription>Clone, install dependencies, and run the automated setup</CardDescription>
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
						<div class="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-2xl font-bold text-primary-foreground">
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
							Everything is already configured: authentication, database, UI components,
							and routing. Just start building your features!
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div class="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-2xl font-bold text-primary-foreground">
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
							Vercel adapter is pre-configured. Just add your environment variables and
							deploy. The setup script even provides the exact values to copy!
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
				<p class="text-lg text-muted-foreground">
					Production-ready features without the bloat
				</p>
			</div>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader>
						<div class="mb-4 text-4xl">🔐</div>
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
						<div class="mb-4 text-4xl">🗄️</div>
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
						<div class="mb-4 text-4xl">🎨</div>
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
						<div class="mb-4 text-4xl">⚡</div>
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
						<div class="mb-4 text-4xl">🚀</div>
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
						<div class="mb-4 text-4xl">🔒</div>
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
						SvelteKit • Node.js 22 • Vite
					</p>
				</div>
				<div class="rounded-lg border bg-card p-4">
					<h3 class="mb-2 font-semibold">Database & ORM</h3>
					<p class="text-sm text-muted-foreground">
						Turso (LibSQL) • Drizzle ORM
					</p>
				</div>
				<div class="rounded-lg border bg-card p-4">
					<h3 class="mb-2 font-semibold">Styling & UI</h3>
					<p class="text-sm text-muted-foreground">
						Tailwind CSS v4 • shadcn-svelte • Iconify
					</p>
				</div>
				<div class="rounded-lg border bg-card p-4">
					<h3 class="mb-2 font-semibold">Deployment</h3>
					<p class="text-sm text-muted-foreground">
						Vercel • GitHub Actions ready
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
				Start your next project with a solid foundation. No configuration headaches, just
				code.
			</p>
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				{#if data.user}
					<Button href="/dashboard" size="lg"> Go to Dashboard </Button>
				{:else}
					<Button href="/sign-up" size="lg"> Get Started Now </Button>
					<Button href="/sign-in" variant="outline" size="lg"> Sign In </Button>
				{/if}
			</div>
		</div>
	</section>
</div>
