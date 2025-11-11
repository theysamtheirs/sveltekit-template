<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
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

<nav class="border-b">
	<div class="container mx-auto flex h-16 items-center justify-between px-4">
		<a href="/" class="text-lg font-semibold">SvelteKit Template</a>
		<div class="flex items-center gap-4">
			{#if user}
				<a href="/dashboard" class="text-sm hover:underline">Dashboard</a>
				<DropdownMenu>
					<DropdownMenuTrigger
						class="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
					>
						<span class="size-2 rounded-full bg-primary"></span>
						{user.username}
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<div class="px-2 py-1.5 text-sm">
							<div class="font-medium">{user.username}</div>
							<div class="text-xs text-muted-foreground">{user.id}</div>
						</div>
						<DropdownMenuSeparator />
						<DropdownMenuItem onclick={handleSignOut}> Sign out </DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			{:else}
				<Button href="/sign-in" variant="ghost"> Sign in </Button>
				<Button href="/sign-up"> Sign up </Button>
			{/if}
		</div>
	</div>
</nav>

