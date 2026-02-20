<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Printer, Download, AlertTriangle } from 'lucide-svelte';
	import ShareQRCode from '$lib/components/ShareQRCode.svelte';
	import { getDisplayId } from '$lib/utils/id-generator';
	import { getShares, clearShares } from '$lib/stores/secure-share-state.svelte';
	import { Button } from '$lib/components/ui';
	import type { Share } from '$lib/types/share';

	let shares: Share[] = $state([]);
	let currentDate = $state('');

	onMount(() => {
		// Load shares from secure memory store
		const storedShares = getShares();
		if (!storedShares || storedShares.length === 0) {
			// No shares found, redirect back to configuration
			goto('/secret-sharing');
			return;
		}

		shares = storedShares;
		currentDate = new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	});

	function handlePrint() {
		window.print();
	}

	function handleSavePDF() {
		// Browser's print dialog with "Save as PDF" option
		window.print();
	}

	function handleBack() {
		// Clear shares from memory
		clearShares();
		goto('/secret-sharing');
	}
</script>

<svelte:head>
	<title>Print Shares - Bitwarden Emergency Kit</title>
</svelte:head>

<!-- Screen-only controls -->
<div class="screen-only sticky top-0 z-10 border-b border-gray-100 bg-white py-3">
	<div class="container mx-auto flex max-w-6xl items-center justify-between px-4">
		<h1 class="text-lg font-bold text-gray-900">Secret Shares</h1>
		<div class="flex gap-2">
			<Button onclick={handleBack} variant="ghost" size="md">← Edit</Button>
			<Button onclick={handleSavePDF} variant="accent" size="md">
				<span class="flex items-center justify-center gap-2">
					<Download class="mr-2 h-4 w-4" />
					Save PDF
				</span>
			</Button>
			<Button onclick={handlePrint} variant="primary" size="md">
				<span class="flex items-center justify-center gap-2">
					<Printer class="mr-2 h-4 w-4" />
					Print All
				</span>
			</Button>
		</div>
	</div>
</div>

<!-- Screen-only instructions -->
<div class="screen-only container mx-auto max-w-6xl px-4 py-4">
	<div class="rounded-lg border border-amber-200 bg-amber-50/50 p-3 shadow-sm">
		<div class="flex items-start gap-2">
			<AlertTriangle class="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
			<div>
				<h3 class="text-sm font-semibold text-amber-900">Distribution Instructions</h3>
				<ul class="mt-1 space-y-1 text-xs text-amber-800">
					<li>• Give each share to a different trusted individual</li>
					<li>• Any {shares[0]?.threshold || 0} shares can recover the original secrets</li>
					<li>• Store shares securely and separately</li>
				</ul>
			</div>
		</div>
	</div>
</div>

<!-- Print-ready share pages -->
{#each shares as share (share.id)}
	<div class="share-page">
		<!-- Share Header -->
		<div class="mb-6 border-b border-gray-800 pb-4 text-center print:border-b-2">
			<h1 class="mb-2 text-3xl font-bold text-gray-900">BITWARDEN RECOVERY SHARE</h1>
			<p class="mb-1 text-xl font-semibold text-gray-700">
				Share {share.shareNumber} of {share.totalShares}
			</p>
			<p class="text-sm text-gray-600">ID: {getDisplayId(share.id)}</p>
		</div>

		<!-- Security Notice -->
		<div
			class="mb-6 rounded-lg border border-red-200 bg-red-50/30 p-3 shadow-sm print:border-red-800 print:shadow-none"
		>
			<h2 class="mb-2 text-center text-lg font-bold text-red-900">⚠️ FOR YOUR EYES ONLY ⚠️</h2>
			<p class="text-center text-sm text-red-800">
				This share contains encrypted data. Do not share with others.<br />
				Combine with
				<strong>{share.threshold - 1} other {share.threshold - 1 === 1 ? 'share' : 'shares'}</strong
				> to recover the original secrets.
			</p>
		</div>

		<!-- QR Code -->
		<div class="mb-6 flex justify-center">
			<div class="rounded-lg border border-gray-300 p-4 print:border-2">
				<ShareQRCode data={share.data} size={300} />
			</div>
		</div>

		<!-- Share Data -->
		<div class="mb-6">
			<h3 class="mb-2 font-semibold text-gray-900">Share Data (Base64):</h3>
			<div
				class="rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-xs leading-relaxed break-all text-gray-800"
			>
				{share.data}
			</div>
			<p class="mt-1 text-xs text-gray-600">Can be manually entered if QR code is unreadable</p>
		</div>

		<!-- Recipient Information -->
		<div class="mb-6 rounded-lg border border-gray-300 p-4">
			<h3 class="mb-3 font-semibold text-gray-900">Recipient Information:</h3>
			<div class="space-y-3">
				<div>
					<label class="mb-1 block text-sm font-medium text-gray-700">Recipient Name:</label>
					<div class="h-8 border-b-2 border-gray-400"></div>
				</div>
				<div>
					<label class="mb-1 block text-sm font-medium text-gray-700">Contact Phone:</label>
					<div class="h-8 border-b-2 border-gray-400"></div>
				</div>
				<div>
					<label class="mb-1 block text-sm font-medium text-gray-700">Date Distributed:</label>
					<div class="h-8 border-b-2 border-gray-400"></div>
				</div>
			</div>
		</div>

		<!-- Recovery Instructions -->
		<div
			class="mb-6 rounded-lg border border-primary-200 bg-primary-50/50 p-4 print:border-2 print:border-primary-800"
		>
			<h3 class="mb-3 font-bold text-primary-900">Emergency Recovery Instructions</h3>

			<div class="mb-4">
				<h4 class="mb-2 font-semibold text-primary-900">
					If the Owner is Permanently Unavailable:
				</h4>
				<ol class="space-y-1 text-sm text-primary-800">
					<li>
						<strong>1. Contact Other Share Holders:</strong> Reach out to {share.threshold - 1} other
						{share.threshold - 1 === 1
							? 'person who received a share'
							: 'people who received shares'}
					</li>
					<li>
						<strong>2. Gather Shares Securely:</strong> Meet in person or use secure video. Never send
						via email/text
					</li>
					<li><strong>3. Visit Recovery Website:</strong> Go to emkit.ananddesai.dev/recover</li>
					<li>
						<strong>4. Scan or Enter Shares:</strong> Use phone camera to scan QR codes or manually enter
						share data
					</li>
					<li>
						<strong>5. Recover Secrets:</strong> The website will reconstruct the original passwords
					</li>
					<li>
						<strong>6. Access Accounts:</strong> Use recovered credentials to access Bitwarden and other
						accounts
					</li>
				</ol>
			</div>

			<div>
				<h4 class="mb-2 font-semibold text-primary-900">Security Notes:</h4>
				<ul class="space-y-1 text-sm text-primary-800">
					<li>• This single share reveals nothing about the original secrets</li>
					<li>• You need {share.threshold} shares total to recover</li>
					<li>• Store in a secure location (safe, safety deposit box)</li>
					<li>• If lost or compromised, contact the owner immediately</li>
				</ul>
			</div>
		</div>

		<!-- Metadata Footer -->
		<div class="border-t border-gray-300 pt-4 text-center text-sm text-gray-600">
			<p><strong>Created:</strong> {currentDate}</p>
			<p><strong>Share ID:</strong> {share.id}</p>
			<p class="mt-2">Generated by Bitwarden Emergency Kit | Version 2.0</p>
		</div>
	</div>
{/each}

<style>
	/* Screen-only styles */
	@media screen {
		.print-only {
			display: none;
		}

		.share-page {
			max-width: 800px;
			margin: 2rem auto;
			padding: 2rem;
			border: 1px solid #e5e7eb;
			border-radius: 0.5rem;
			background: white;
		}
	}

	/* Print styles are in app.css */
</style>
