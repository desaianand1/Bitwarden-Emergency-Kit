<script lang="ts">
	import { Checkbox } from 'bits-ui';
	import { Check } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	let {
		checked = $bindable(false),
		children,
		class: className = '',
		...restProps
	}: {
		checked?: boolean;
		children?: Snippet;
		class?: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string]: any;
	} = $props();
</script>

<div class="flex items-center gap-2 {className}">
	<Checkbox.Root
		bind:checked
		{...restProps}
		class="flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white transition-all focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600"
	>
		{#if checked}
			<Check class="h-4 w-4 text-white" />
		{/if}
	</Checkbox.Root>
	{#if children}
		{@render children()}
	{/if}
</div>
