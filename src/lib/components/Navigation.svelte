<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { invalidateAll } from '$app/navigation';

	type Props = {
		user: { id: string; username: string } | null;
	};

	let { user }: Props = $props();

	async function handleSignOut() {
		try {
			await fetch('/sign-out', { method: 'POST' });
			await invalidateAll();
		} catch (error) {
			console.error('Sign out error:', error);
		}
	}
</script>

<nav class="border-b" aria-label="Main navigation">
	<div class="container mx-auto flex h-16 items-center justify-between px-4">
		<a
			href="/"
			class="rounded text-lg font-semibold focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
		>
			SvelteKit Template
		</a>
		<div class="flex items-center gap-4">
			<ThemeToggle />
			{#if user}
				<a
					href="/dashboard"
					class="rounded text-sm hover:underline focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
				>
					Dashboard
				</a>
				<DropdownMenu>
					<DropdownMenuTrigger
						class="inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
						aria-label="User menu for {user.username}"
					>
						<span class="size-2 rounded-full bg-primary" aria-hidden="true"></span>
						<span class="sr-only">User menu: </span>
						{user.username}
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<div class="px-2 py-1.5 text-sm" role="presentation">
							<div class="font-medium">{user.username}</div>
							<div class="text-xs text-muted-foreground" aria-label="User ID: {user.id}">
								{user.id}
							</div>
						</div>
						<DropdownMenuSeparator />
						<DropdownMenuItem onclick={handleSignOut}>Sign out</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			{:else}
				<Button href="/sign-in" variant="ghost">Sign in</Button>
				<Button href="/sign-up">Sign up</Button>
			{/if}
		</div>
	</div>
</nav>
