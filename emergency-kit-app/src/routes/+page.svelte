<script lang="ts">
	import { Shield, Share2, KeyRound } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Bitwarden Emergency Kit</title>
	<meta name="description" content="Secure your digital legacy with emergency recovery options" />
</svelte:head>

<div class="container mx-auto max-w-6xl px-4 py-12">
	<header class="mb-12 text-center">
		<h1 class="mb-4 text-4xl font-bold text-gray-900">Bitwarden Emergency Kit</h1>
		<p class="text-lg text-gray-600">
			Secure your digital legacy with printable emergency recovery documents
		</p>
	</header>

	<div class="mb-12 grid gap-6 md:grid-cols-2">
		<!-- Emergency Kit -->
		<a
			href="/emergency-kit"
			class="group block rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md"
		>
			<div class="mb-4 flex items-center gap-3">
				<Shield class="h-7 w-7 text-primary-600" />
				<h2 class="text-xl font-semibold text-gray-900">Emergency Kit</h2>
			</div>
			<p class="mb-3 text-sm text-gray-600">
				Create a printable document with your master password, email credentials, and recovery
				codes. Perfect for a single trusted person or secure storage.
			</p>
			<p class="text-xs text-gray-500">
				Best for: Single emergency contact, safety deposit box, home safe
			</p>
			<div
				class="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition-all group-hover:bg-primary-700"
			>
				Create Emergency Kit →
			</div>
		</a>

		<!-- Secret Sharing -->
		<a
			href="/secret-sharing"
			class="group block rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md"
		>
			<div class="mb-4 flex items-center gap-3">
				<Share2 class="h-7 w-7 text-secondary-600" />
				<h2 class="text-xl font-semibold text-gray-900">Secret Sharing</h2>
			</div>
			<p class="mb-3 text-sm text-gray-600">
				Split your credentials into multiple shares. Distribute to trusted individuals—they need to
				work together to recover your secrets. No single person can access your data alone.
			</p>
			<p class="text-xs text-gray-500">
				Best for: Multiple trusted contacts, distributed security, family members
			</p>
			<div
				class="mt-4 inline-flex items-center gap-2 rounded-lg bg-secondary-600 px-5 py-2.5 text-sm font-medium text-white transition-all group-hover:bg-secondary-700"
			>
				Create Secret Shares →
			</div>
		</a>
	</div>

	<!-- Recovery Section -->
	<a
		href="/recover"
		class="group block rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md"
	>
		<div class="mb-4 flex items-center gap-3">
			<KeyRound class="h-7 w-7 text-gray-600" />
			<h2 class="text-xl font-semibold text-gray-900">Recover Secrets</h2>
		</div>
		<p class="mb-3 text-sm text-gray-600">
			Have shares from Secret Sharing mode? Combine them here to recover your original credentials.
		</p>
		<p class="text-xs text-gray-500">Requires shares from Secret Sharing mode</p>
		<div
			class="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-900 transition-all group-hover:bg-gray-200"
		>
			Recover from Shares →
		</div>
	</a>

	<!-- Info Section -->
	<div class="mt-12 text-center">
		<p class="text-sm text-gray-500">
			All operations are performed locally in your browser. Your secrets never leave your device.
		</p>
	</div>
</div>
