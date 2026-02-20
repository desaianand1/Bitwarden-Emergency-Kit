<script lang="ts">
	import type { Snippet } from 'svelte';

	let { content, children }: { content: string; children?: Snippet } = $props();
</script>

<div class="group relative inline-block">
	{@render children?.()}
	<div
		class="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-2 opacity-0 transition-opacity group-hover:opacity-100"
	>
		<div class="rounded bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white">
			{content}
		</div>
	</div>
</div>
