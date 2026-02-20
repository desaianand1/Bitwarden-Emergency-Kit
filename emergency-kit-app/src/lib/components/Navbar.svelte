<script lang="ts">
	import { page } from '$app/stores';
	import { Shield } from 'lucide-svelte';

	const currentPath = $derived($page.url.pathname);

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/emergency-kit', label: 'Emergency Kit' },
		{ href: '/secret-sharing', label: 'Secret Sharing' },
		{ href: '/recover', label: 'Recover' }
	];

	function isActive(path: string): boolean {
		if (path === '/') return currentPath === '/';
		return currentPath.startsWith(path);
	}
</script>

<nav class="screen-only border-b border-gray-100 bg-white">
	<div class="container mx-auto max-w-6xl px-4">
		<div class="flex items-center justify-between">
			<a href="/" class="flex items-center gap-2 py-4">
				<Shield class="h-6 w-6 text-primary-600" />
				<span class="text-xl font-bold text-gray-900">Bitwarden Emergency Kit</span>
			</a>

			<ul class="flex items-center">
				{#each navItems as item (item.href)}
					<li>
						{#if isActive(item.href)}
							<span
								class="border-b-2 border-primary-600 px-4 py-3 text-sm font-medium text-primary-600"
							>
								{item.label}
							</span>
						{:else}
							<a
								href={item.href}
								class="border-b-2 border-transparent px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:text-gray-900"
							>
								{item.label}
							</a>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>
