<script lang="ts">
	import { Label as LabelPrimitive } from 'bits-ui';
	import type { Snippet } from 'svelte';

	let {
		children,
		...restProps
	}: {
		children?: Snippet;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string]: any;
	} = $props();
</script>

<LabelPrimitive.Root class="cursor-pointer text-sm font-medium text-gray-700" {...restProps}>
	{@render children?.()}
</LabelPrimitive.Root>
