<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import type { Snippet } from 'svelte';

	let {
		open = $bindable(false),
		title,
		description,
		children,
		...restProps
	}: {
		open?: boolean;
		title?: string;
		description?: string;
		children?: Snippet;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string]: any;
	} = $props();
</script>

<DialogPrimitive.Root bind:open {...restProps}>
	<DialogPrimitive.Portal>
		<DialogPrimitive.Overlay class="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
		<DialogPrimitive.Content
			class="fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-md"
		>
			{#if title}
				<DialogPrimitive.Title class="mb-2 text-xl font-bold text-gray-900">
					{title}
				</DialogPrimitive.Title>
			{/if}
			{#if description}
				<DialogPrimitive.Description class="mb-4 text-gray-600">
					{description}
				</DialogPrimitive.Description>
			{/if}
			{@render children?.()}
		</DialogPrimitive.Content>
	</DialogPrimitive.Portal>
</DialogPrimitive.Root>
