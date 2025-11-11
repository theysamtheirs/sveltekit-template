<script lang="ts">
	import type { PageData } from './$types';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';

	let { data }: { data: PageData } = $props();
</script>

<div class="container mx-auto px-4 py-8">
	<div class="mb-8">
		<h1 class="text-3xl font-bold">Dashboard</h1>
		<p class="text-muted-foreground">Welcome back, {data.user.username}!</p>
	</div>

	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		<Card>
			<CardHeader>
				<CardTitle>User Information</CardTitle>
				<CardDescription>Your account details</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="space-y-2">
					<div>
						<p class="text-sm text-muted-foreground">Username</p>
						<p class="font-medium">{data.user.username}</p>
					</div>
					<div>
						<p class="text-sm text-muted-foreground">User ID</p>
						<p class="font-mono text-sm">{data.user.id}</p>
					</div>
				</div>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Quick Actions</CardTitle>
				<CardDescription>Common tasks</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="space-y-2">
					<p class="text-sm text-muted-foreground">More features coming soon...</p>
				</div>
			</CardContent>
		</Card>

		<Card>
			<CardHeader>
				<CardTitle>Statistics</CardTitle>
				<CardDescription>Your activity overview</CardDescription>
			</CardHeader>
			<CardContent>
				<div class="space-y-2">
					<p class="text-sm text-muted-foreground">Statistics will appear here...</p>
				</div>
			</CardContent>
		</Card>
	</div>
</div>

