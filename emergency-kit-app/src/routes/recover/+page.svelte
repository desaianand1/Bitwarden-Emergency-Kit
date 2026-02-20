<script lang="ts">
	import { onDestroy } from 'svelte';
	import { X, Copy, Trash2, AlertCircle, Shield, CheckCircle } from 'lucide-svelte';
	import { combineShares } from '$lib/utils/shamir';
	import {
		enhancedValidateShareFormat,
		validateShareSet,
		isValidSecretBundle,
		sanitizeErrorMessage
	} from '$lib/utils/validation';
	import { Button } from '$lib/components/ui';
	import Spinner from '$lib/components/Spinner.svelte';
	import type { SecretBundle } from '$lib/types/share';

	// State for shares
	let shares = $state<string[]>([]);
	let currentInput = $state('');
	let shareStatuses = $state<boolean[]>([]);

	// State for recovery
	let isRecovering = $state(false);
	let recoveryError = $state('');
	let recoveredSecrets = $state<SecretBundle | null>(null);

	// State for clipboard feedback
	let clipboardSuccess = $state(false);
	let clipboardError = $state(false);

	// State for auto-clear
	let autoClearMinutes = $state(5);
	let autoClearEnabled = $state(true);
	let autoClearTimer: number | null = null;
	let remainingSeconds = $state(0);

	// Derived state
	const validShares = $derived(shares.filter((_, i) => shareStatuses[i]));
	const canRecover = $derived(validShares.length >= 2 && !isRecovering);

	function addShare() {
		const trimmedInput = currentInput.trim();
		if (!trimmedInput) return;

		// Check for duplicate before adding
		if (shares.includes(trimmedInput)) {
			recoveryError = 'This share has already been added. Each share should be unique.';
			return;
		}

		// Use ENHANCED validation
		const validation = enhancedValidateShareFormat(trimmedInput);
		shares.push(trimmedInput);
		shareStatuses.push(validation.valid);

		if (!validation.valid) {
			recoveryError = `Invalid share: ${validation.error}`;
		} else {
			recoveryError = '';
		}

		currentInput = '';
	}

	function removeShare(index: number) {
		shares = shares.filter((_, i) => i !== index);
		shareStatuses = shareStatuses.filter((_, i) => i !== index);
	}

	function clearAll() {
		shares = [];
		shareStatuses = [];
		currentInput = '';
		recoveredSecrets = null;
		recoveryError = '';
		stopAutoClearTimer();
	}

	async function recoverSecrets() {
		if (!canRecover) return;

		isRecovering = true;
		recoveryError = '';

		try {
			const validation = validateShareSet(validShares);
			if (!validation.valid) {
				throw new Error(validation.error || 'Invalid share set');
			}

			const reconstructed = await combineShares(validShares);

			// Parse and VALIDATE
			let secrets: SecretBundle;
			try {
				secrets = JSON.parse(reconstructed);
			} catch {
				throw new Error(
					'Failed to parse recovered data. The shares may be corrupted or from different sets.'
				);
			}

			// Schema validation
			if (!isValidSecretBundle(secrets)) {
				throw new Error(
					'Recovered data does not match expected format. The shares may be invalid.'
				);
			}

			recoveredSecrets = secrets;

			if (autoClearEnabled) {
				startAutoClearTimer();
			}
		} catch (error) {
			if (error instanceof Error) {
				recoveryError = sanitizeErrorMessage(error.message);
			} else {
				recoveryError =
					'Failed to recover secrets. Please verify your shares are correct and from the same set.';
			}
		} finally {
			isRecovering = false;
		}
	}

	function startAutoClearTimer() {
		remainingSeconds = autoClearMinutes * 60;

		autoClearTimer = window.setInterval(() => {
			remainingSeconds--;
			if (remainingSeconds <= 0) {
				clearAll();
			}
		}, 1000);
	}

	function stopAutoClearTimer() {
		if (autoClearTimer !== null) {
			clearInterval(autoClearTimer);
			autoClearTimer = null;
		}
		remainingSeconds = 0;
	}

	async function copyToClipboard(text: string) {
		try {
			await navigator.clipboard.writeText(text);
			clipboardSuccess = true;
			setTimeout(() => (clipboardSuccess = false), 2000);
		} catch {
			clipboardError = true;
			setTimeout(() => (clipboardError = false), 3000);
		}
	}

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	onDestroy(() => {
		if (autoClearTimer) {
			clearInterval(autoClearTimer);
			autoClearTimer = null;
		}
	});
</script>

<svelte:head>
	<title>Recover Secrets - Bitwarden Emergency Kit</title>
</svelte:head>

<div class="container mx-auto max-w-4xl px-4 py-12">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="mb-2 text-3xl font-bold text-gray-900">Recover Secrets</h1>
		<p class="text-gray-600">
			Enter or scan your secret shares to reconstruct the original credentials
		</p>
	</div>

	{#if !recoveredSecrets}
		<!-- Security Notice -->
		<div class="mb-6 rounded-lg bg-white p-4 shadow-sm">
			<div class="flex items-start gap-2">
				<Shield class="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
				<div>
					<h3 class="text-sm font-semibold text-gray-900">Privacy Notice</h3>
					<p class="text-xs text-gray-600">
						All recovery operations are performed locally in your browser.
					</p>
				</div>
			</div>
		</div>

		<!-- Input Section -->
		<section class="mb-6 rounded-lg bg-white p-4 shadow-sm">
			<h2 class="mb-4 text-base font-semibold text-gray-900">Enter Shares</h2>

			<div class="mb-4">
				<label for="shareInput" class="mb-2 block text-sm font-medium text-gray-700">
					Share Data
				</label>
				<div class="flex gap-2">
					<input
						id="shareInput"
						type="text"
						bind:value={currentInput}
						onkeydown={(e) => e.key === 'Enter' && addShare()}
						placeholder="Paste share data here..."
						class="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none"
					/>
					<Button onclick={addShare} disabled={!currentInput.trim()} variant="primary" size="md">
						Add Share
					</Button>
				</div>
				<p class="mt-2 text-xs text-gray-500">
					Paste the base64 share data from your sheet. To scan QR codes, use your phone's camera app
					and paste the decoded text here.
				</p>
			</div>

			<!-- Shares List -->
			{#if shares.length > 0}
				<div class="space-y-2">
					<div class="flex items-center justify-between">
						<h3 class="text-sm font-medium text-gray-700">
							Added Shares ({validShares.length} valid)
						</h3>
						<button onclick={clearAll} class="text-sm text-red-600 hover:text-red-700">
							Clear All
						</button>
					</div>

					{#each shares as _share, index (index)}
						<div
							class="flex items-center justify-between rounded-lg border p-3 {shareStatuses[index]
								? 'border-green-200 bg-white'
								: 'border-red-200 bg-white'}"
						>
							<div class="flex items-center gap-2">
								{#if shareStatuses[index]}
									<CheckCircle class="h-4 w-4 text-green-600" />
								{:else}
									<AlertCircle class="h-4 w-4 text-red-600" />
								{/if}
								<span class="font-mono text-xs text-gray-600">
									Share {index + 1}
								</span>
							</div>
							<button
								onclick={() => removeShare(index)}
								class="text-gray-400 transition-colors hover:text-red-600"
							>
								<X class="h-4 w-4" />
							</button>
						</div>
					{/each}
				</div>
			{/if}
		</section>

		<!-- Recovery Section -->
		{#if shares.length > 0}
			<section class="mb-6">
				{#if validShares.length < 2}
					<div class="rounded-lg border border-amber-200 bg-amber-50/50 p-3 shadow-sm">
						<div class="flex items-start gap-2">
							<AlertCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
							<p class="text-sm text-amber-800">
								Add at least {2 - validShares.length} more valid share{2 - validShares.length === 1
									? ''
									: 's'} to recover secrets
							</p>
						</div>
					</div>
				{:else}
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm text-gray-600">
								{validShares.length} valid shares added. Ready to recover.
							</p>
						</div>
						<Button
							onclick={recoverSecrets}
							disabled={!canRecover}
							variant="accent"
							size="md"
							aria-label="Combine shares to recover secrets"
						>
							{#if isRecovering}
								<Spinner class="mr-2" />
								Recovering...
							{:else}
								Recover Secrets
							{/if}
						</Button>
					</div>
				{/if}

				{#if recoveryError}
					<div class="mt-4 rounded-lg border border-red-200 bg-red-50/30 p-3 shadow-sm">
						<div class="flex items-start gap-2">
							<X class="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
							<div>
								<h3 class="text-sm font-semibold text-red-900">Recovery Failed</h3>
								<p class="text-sm text-red-800">{recoveryError}</p>
							</div>
						</div>
					</div>
				{/if}
			</section>
		{/if}
	{:else}
		<!-- Success: Display Recovered Secrets -->
		<div class="mb-6 rounded-lg border border-green-200 bg-green-50/50 p-3 shadow-sm">
			<div class="flex items-start gap-2">
				<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
				<div class="flex-1">
					<h3 class="text-sm font-semibold text-green-900">Secrets Recovered Successfully</h3>
					<p class="text-xs text-green-800">
						Your credentials have been reconstructed from the shares.
					</p>
				</div>
			</div>
		</div>

		<!-- Auto-clear timer -->
		{#if autoClearEnabled && remainingSeconds > 0}
			<div class="mb-6 rounded-lg border border-amber-200 bg-amber-50/50 p-3 shadow-sm">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<AlertCircle class="h-4 w-4 text-amber-600" />
						<p class="text-sm text-amber-800">
							Auto-clear in: <strong>{formatTime(remainingSeconds)}</strong>
						</p>
					</div>
					<button onclick={stopAutoClearTimer} class="text-sm text-amber-700 hover:text-amber-900">
						Cancel Timer
					</button>
				</div>
			</div>
		{/if}

		<!-- Recovered Secrets Display -->
		<section class="mb-6 space-y-6">
			{#if recoveredSecrets.masterPassword}
				<div class="rounded-lg bg-white p-4 shadow-sm">
					<div class="mb-3 flex items-center justify-between">
						<h3 class="text-sm font-semibold text-gray-900">Master Password</h3>
						<Button
							onclick={() => copyToClipboard(recoveredSecrets?.masterPassword || '')}
							variant="ghost"
							size="sm"
						>
							<Copy class="mr-1 h-3 w-3" />
							Copy
						</Button>
					</div>
					<p class="font-mono text-sm text-gray-900">
						{recoveredSecrets.masterPassword}
					</p>
				</div>
			{/if}

			{#if recoveredSecrets.email}
				<div class="rounded-lg bg-white p-4 shadow-sm">
					<h3 class="mb-3 text-sm font-semibold text-gray-900">Email Account Credentials</h3>

					<div class="space-y-3">
						<div>
							<div class="mb-1 flex items-center justify-between">
								<div class="text-xs font-medium text-gray-700">Email Address</div>
								<button
									onclick={() => copyToClipboard(recoveredSecrets?.email || '')}
									class="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700"
								>
									<Copy class="h-3 w-3" />
									Copy
								</button>
							</div>
							<p class="font-mono text-sm text-gray-900">
								{recoveredSecrets.email}
							</p>
						</div>

						<div>
							<div class="mb-1 flex items-center justify-between">
								<div class="text-xs font-medium text-gray-700">Email Password</div>
								<button
									onclick={() => copyToClipboard(recoveredSecrets?.emailPassword || '')}
									class="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700"
								>
									<Copy class="h-3 w-3" />
									Copy
								</button>
							</div>
							<p class="font-mono text-sm text-gray-900">
								{recoveredSecrets.emailPassword}
							</p>
						</div>
					</div>
				</div>
			{/if}

			{#if recoveredSecrets.authenticatorEmail}
				<div class="rounded-lg bg-white p-4 shadow-sm">
					<h3 class="mb-3 text-sm font-semibold text-gray-900">Authenticator App Credentials</h3>

					<div class="space-y-3">
						<div>
							<div class="mb-1 flex items-center justify-between">
								<div class="text-xs font-medium text-gray-700">App Account Email</div>
								<button
									onclick={() => copyToClipboard(recoveredSecrets?.authenticatorEmail || '')}
									class="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700"
								>
									<Copy class="h-3 w-3" />
									Copy
								</button>
							</div>
							<p class="font-mono text-sm text-gray-900">
								{recoveredSecrets.authenticatorEmail}
							</p>
						</div>

						<div>
							<div class="mb-1 flex items-center justify-between">
								<div class="text-xs font-medium text-gray-700">App Account Password</div>
								<button
									onclick={() => copyToClipboard(recoveredSecrets?.authenticatorPassword || '')}
									class="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700"
								>
									<Copy class="h-3 w-3" />
									Copy
								</button>
							</div>
							<p class="font-mono text-sm text-gray-900">
								{recoveredSecrets.authenticatorPassword}
							</p>
						</div>

						<div>
							<div class="mb-1 flex items-center justify-between">
								<div class="text-xs font-medium text-gray-700">Recovery Key / Backup Code</div>
								<button
									onclick={() => copyToClipboard(recoveredSecrets?.authenticatorRecoveryKey || '')}
									class="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700"
								>
									<Copy class="h-3 w-3" />
									Copy
								</button>
							</div>
							<p class="font-mono text-sm break-all text-gray-900">
								{recoveredSecrets.authenticatorRecoveryKey}
							</p>
						</div>
					</div>
				</div>
			{/if}
		</section>

		<!-- Action Buttons -->
		<div class="flex items-center justify-between">
			<a href="/" class="text-gray-600 hover:text-gray-900"> ← Back to Home </a>
			<Button onclick={clearAll} variant="danger" size="md">
				<Trash2 class="mr-2 h-4 w-4" />
				Clear All Data
			</Button>
		</div>

		<!-- Security Warning -->
		<div class="mt-6 rounded-lg border border-amber-200 bg-amber-50/50 p-3 shadow-sm">
			<p class="text-sm text-amber-800">
				<strong>Important:</strong> Copy your credentials and clear this page when done. For security,
				this data is stored only in memory and will be lost when you close the browser.
			</p>
		</div>
	{/if}

	<!-- Clipboard Feedback -->
	{#if clipboardSuccess}
		<div
			class="fixed right-4 bottom-4 z-50 rounded-lg border border-green-200 bg-green-50 p-3 shadow-lg"
		>
			<div class="flex items-center gap-2">
				<CheckCircle class="h-4 w-4 text-green-600" />
				<p class="text-sm text-green-800">Copied to clipboard</p>
			</div>
		</div>
	{/if}

	{#if clipboardError}
		<div
			class="fixed right-4 bottom-4 z-50 rounded-lg border border-red-200 bg-red-50 p-3 shadow-lg"
		>
			<div class="flex items-center gap-2">
				<AlertCircle class="h-4 w-4 text-red-600" />
				<p class="text-sm text-red-800">Failed to copy. Please copy manually.</p>
			</div>
		</div>
	{/if}
</div>
