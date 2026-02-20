<script lang="ts">
	import { Button as ButtonPrimitive } from 'bits-ui';
	import type { Snippet } from 'svelte';

	let {
		variant = 'primary',
		size = 'md',
		children,
		...restProps
	}: {
		variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		children?: Snippet;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string]: any;
	} = $props();

	const variants = {
		primary: 'bg-primary-600 hover:bg-primary-700 text-white transition-all duration-200',
		secondary:
			'bg-white hover:bg-gray-100 active:bg-gray-200 focus-visible:bg-gray-100 text-gray-900 border border-gray-200 hover:border-gray-300 transition-all duration-200',
		accent: 'bg-secondary-600 hover:bg-secondary-700 text-white transition-all duration-200',
		danger: 'bg-red-600 hover:bg-red-700 text-white transition-all duration-200',
		ghost: 'hover:bg-gray-100 text-gray-700 transition-all duration-200'
	};

	const sizes = {
		sm: 'px-3 py-1.5 text-sm min-h-[36px]',
		md: 'px-5 py-2.5 text-base min-h-[40px]',
		lg: 'px-7 py-3.5 text-lg min-h-[44px]'
	};
</script>

<ButtonPrimitive.Root
	class="rounded-lg font-medium focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 {variants[
		variant
	]} {sizes[size]}"
	{...restProps}
>
	{@render children?.()}
</ButtonPrimitive.Root>
