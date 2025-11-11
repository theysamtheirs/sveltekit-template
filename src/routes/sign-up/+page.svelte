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

	let { form }: { form: ActionData } = $props();
</script>

<div class="flex min-h-screen items-center justify-center p-4">
	<Card class="w-full max-w-md">
		<CardHeader>
			<CardTitle>Create an Account</CardTitle>
			<CardDescription>Enter your information to create a new account</CardDescription>
		</CardHeader>
		<CardContent>
			{#if form?.message}
				<Alert variant="destructive" class="mb-4">
					<AlertDescription>{form.message}</AlertDescription>
				</Alert>
			{/if}
			<form method="post" action="?/register" use:enhance class="space-y-4">
				<div class="space-y-2">
					<Label for="username">Username</Label>
					<Input
						id="username"
						name="username"
						type="text"
						required
						autocomplete="username"
						placeholder="Choose a username"
					/>
					<p class="text-xs text-muted-foreground">
						3-31 characters, alphanumeric and underscores only
					</p>
				</div>
				<div class="space-y-2">
					<Label for="password">Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						required
						autocomplete="new-password"
						placeholder="Choose a password"
					/>
					<p class="text-xs text-muted-foreground">Minimum 6 characters</p>
				</div>
				<Button type="submit" class="w-full"> Create Account </Button>
			</form>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="/sign-in" class="text-primary underline-offset-4 hover:underline">
					Sign in
				</a>
			</div>
		</CardContent>
	</Card>
</div>

