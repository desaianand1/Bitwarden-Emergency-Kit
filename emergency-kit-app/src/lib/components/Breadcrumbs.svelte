<script lang="ts">
	import { page } from '$app/stores';

	const breadcrumbMap: Record<string, string> = {
		'/': 'Home',
		'/secret-sharing': 'Secret Sharing',
		'/secret-sharing/shares': 'Print Shares',
		'/recover': 'Recover Secrets',
		'/emergency-kit': 'Emergency Kit'
	};

	let currentPath = $derived($page.url.pathname);
	let currentLabel = $derived(breadcrumbMap[currentPath] || 'Page');
</script>

<nav class="screen-only mb-4 text-sm" aria-label="Breadcrumb">
	<ol class="flex items-center gap-2">
		<li><a href="/" class="text-primary-600 hover:underline">Home</a></li>
		{#if currentPath !== '/'}
			<li class="text-gray-400">/</li>
			<li class="text-gray-900" aria-current="page">
				{currentLabel}
			</li>
		{/if}
	</ol>
</nav>
