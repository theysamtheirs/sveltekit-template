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

	let username = $state('');
	let password = $state('');
	let usernameTouched = $state(false);
	let passwordTouched = $state(false);
	let usernameValidationMessage = $state('');
	let passwordValidationMessage = $state('');

	function validateUsernameInput(value: string): string {
		const trimmed = value.trim();

		if (trimmed.length < 3) {
			return 'Username must be at least 3 characters long';
		}

		if (trimmed.length > 31) {
			return 'Username must be 31 characters or less';
		}

		if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
			return 'Only letters, numbers, underscores, and hyphens are allowed';
		}

		if (/^[_-]/.test(trimmed)) {
			return 'Username cannot start with an underscore or hyphen';
		}

		if (/[_-]$/.test(trimmed)) {
			return 'Username cannot end with an underscore or hyphen';
		}

		if (/^\d+$/.test(trimmed)) {
			return 'Username cannot be all numbers';
		}

		return '';
	}

	function validatePasswordInput(value: string): string {
		if (value.length < 6) {
			return 'Password must be at least 6 characters long';
		}

		return '';
	}

	function handleUsernameBlur() {
		usernameTouched = true;
		usernameValidationMessage = validateUsernameInput(username);
	}

	function handlePasswordBlur() {
		passwordTouched = true;
		passwordValidationMessage = validatePasswordInput(password);
	}

	// Only validate for button disabled state, not for display
	const isFormValid = $derived(
		!validateUsernameInput(username) && !validatePasswordInput(password)
	);
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
						bind:value={username}
						onblur={handleUsernameBlur}
						class={(usernameTouched && usernameValidationMessage) || form?.message ? 'border-destructive' : ''}
					/>
					{#if usernameTouched && usernameValidationMessage}
						<p class="text-xs text-destructive">{usernameValidationMessage}</p>
					{:else}
						<p class="text-xs text-muted-foreground">
							3-31 characters. Letters, numbers, underscores, and hyphens allowed.
						</p>
					{/if}
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
						bind:value={password}
						onblur={handlePasswordBlur}
						class={(passwordTouched && passwordValidationMessage) || form?.message ? 'border-destructive' : ''}
					/>
					{#if passwordTouched && passwordValidationMessage}
						<p class="text-xs text-destructive">{passwordValidationMessage}</p>
					{:else}
						<p class="text-xs text-muted-foreground">Minimum 6 characters</p>
					{/if}
				</div>
				<Button type="submit" class="w-full" disabled={!isFormValid}>
					Create Account
				</Button>
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

