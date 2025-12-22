<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import type { ErrorHandler } from './$types';

	let { status, error }: Parameters<ErrorHandler>[0] = $props();
</script>

<div class="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
	<Card class="w-full max-w-md">
		<CardHeader class="text-center">
			<div class="mb-4 text-6xl font-bold text-muted-foreground">{status}</div>
			<CardTitle>
				{#if status === 404}
					Page Not Found
				{:else if status === 500}
					Server Error
				{:else}
					Something Went Wrong
				{/if}
			</CardTitle>
			<CardDescription>
				{#if status === 404}
					The page you're looking for doesn't exist.
				{:else if status === 500}
					An unexpected error occurred. Please try again later.
				{:else}
					{error?.message || 'An error occurred'}
				{/if}
			</CardDescription>
		</CardHeader>
		<CardContent class="flex flex-col gap-4">
			<Button href="/" class="w-full"> Go Home </Button>
			{#if status === 500 && error}
				<details class="mt-4">
					<summary class="cursor-pointer text-sm text-muted-foreground">
						Error Details
					</summary>
					<pre class="mt-2 overflow-auto rounded bg-muted p-2 text-xs">{error.message}</pre>
				</details>
			{/if}
		</CardContent>
	</Card>
</div>

