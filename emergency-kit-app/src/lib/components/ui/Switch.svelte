<script lang="ts">
	import { Switch as SwitchPrimitive } from 'bits-ui';
	import type { Snippet } from 'svelte';

	let {
		checked = $bindable(false),
		children,
		...restProps
	}: {
		checked?: boolean;
		children?: Snippet;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string]: any;
	} = $props();
</script>

<div class="flex items-center gap-2">
	<SwitchPrimitive.Root bind:checked {...restProps}>
		<div
			class="relative h-6 w-11 rounded-full bg-gray-200 transition-colors data-[state=checked]:bg-primary-600"
		>
			<SwitchPrimitive.Thumb
				class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform data-[state=checked]:translate-x-5"
			/>
		</div>
	</SwitchPrimitive.Root>
	{#if children}
		{@render children()}
	{/if}
</div>
