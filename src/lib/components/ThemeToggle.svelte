<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { toggleMode } from 'mode-watcher';
</script>

<Button variant="ghost" size="icon" onclick={toggleMode} class="relative" aria-label="Toggle theme">
	<span
		class="icon-[lucide--sun] size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
	></span>
	<span
		class="absolute icon-[lucide--moon] size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
	></span>
	<span class="sr-only">Toggle theme</span>
</Button>
