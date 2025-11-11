<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
	<div class="mx-auto max-w-2xl text-center">
		<h1 class="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
			Welcome to SvelteKit Template
		</h1>
		<p class="mb-8 text-lg leading-8 text-muted-foreground">
			A modern, production-ready SvelteKit template with authentication, database, and
			beautiful UI components. Get started building your next application today.
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

	<div class="mt-16 grid w-full max-w-4xl grid-cols-1 gap-8 px-4 sm:grid-cols-3">
		<div class="text-center">
			<div class="mb-4 text-3xl">⚡</div>
			<h3 class="mb-2 text-lg font-semibold">Fast</h3>
			<p class="text-sm text-muted-foreground">
				Built on SvelteKit for optimal performance and developer experience
			</p>
		</div>
		<div class="text-center">
			<div class="mb-4 text-3xl">🔒</div>
			<h3 class="mb-2 text-lg font-semibold">Secure</h3>
			<p class="text-sm text-muted-foreground">
				Authentication powered by Lucia with secure session management
			</p>
		</div>
		<div class="text-center">
			<div class="mb-4 text-3xl">🎨</div>
			<h3 class="mb-2 text-lg font-semibold">Beautiful</h3>
			<p class="text-sm text-muted-foreground">
				Modern UI components with shadcn-svelte and Tailwind CSS
			</p>
		</div>
	</div>
</div>
