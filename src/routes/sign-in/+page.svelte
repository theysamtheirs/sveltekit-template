<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import SEO from '$lib/components/SEO.svelte';

	let { form }: { form: ActionData } = $props();
</script>

<SEO
	title="Sign In"
	description="Sign in to your account to access the dashboard and features."
	url="/sign-in"
/>

<div class="flex min-h-screen items-center justify-center p-4">
	<Card class="w-full max-w-md">
		<CardHeader>
			<CardTitle>Sign In</CardTitle>
			<CardDescription>Enter your credentials to access your account</CardDescription>
		</CardHeader>
		<CardContent>
			{#if form?.message}
				<Alert
					variant="destructive"
					class="mb-4"
					role="alert"
					aria-live="assertive"
					aria-atomic="true"
				>
					<AlertDescription id="error-message">{form.message}</AlertDescription>
				</Alert>
			{/if}
			<form method="post" action="?/login" use:enhance class="space-y-4" novalidate>
				<div class="space-y-2">
					<Label for="username">Username</Label>
					<Input
						id="username"
						name="username"
						type="text"
						required
						autocomplete="username"
						placeholder="Enter your username"
						aria-describedby={form?.message ? 'error-message' : undefined}
						aria-invalid={form?.message ? 'true' : undefined}
					/>
				</div>
				<div class="space-y-2">
					<Label for="password">Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						required
						autocomplete="current-password"
						placeholder="Enter your password"
						aria-describedby={form?.message ? 'error-message' : undefined}
						aria-invalid={form?.message ? 'true' : undefined}
					/>
				</div>
				<Button type="submit" class="w-full"> Sign In </Button>
			</form>
			<div class="mt-4 text-center text-sm">
				Don't have an account?
				<a href="/sign-up" class="text-primary underline-offset-4 hover:underline">
					Sign up
				</a>
			</div>
		</CardContent>
	</Card>
</div>

