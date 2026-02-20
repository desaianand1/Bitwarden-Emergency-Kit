<script lang="ts">
	import { Shield, AlertTriangle, Info, Eye, EyeOff, HelpCircle } from 'lucide-svelte';
	import { splitSecret } from '$lib/utils/shamir';
	import { generateShareId } from '$lib/utils/id-generator';
	import { navigateToShares } from '$lib/stores/secure-share-state.svelte';
	import { validateInputLength, validateEmail } from '$lib/utils/validation';
	import { Button, Checkbox } from '$lib/components/ui';
	import Spinner from '$lib/components/Spinner.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import type { SecretBundle, Share } from '$lib/types/share';

	// State for secret selection
	let selectedSecrets = $state({
		masterPassword: true,
		email: false,
		authenticator: false
	});

	// State for sharing configuration
	let totalShares = $state(5);
	let threshold = $state(3);

	// State for secret values
	let masterPassword = $state('');
	let email = $state('');
	let emailPassword = $state('');
	let authenticatorEmail = $state('');
	let authenticatorPassword = $state('');
	let authenticatorRecoveryKey = $state('');

	// State for password visibility toggles
	let showMasterPassword = $state(false);
	let showEmailPassword = $state(false);
	let showAuthPassword = $state(false);
	let showAuthRecovery = $state(false);

	// Loading state
	let isGenerating = $state(false);
	let errorMessage = $state('');

	// Derived validation
	const hasSelectedSecrets = $derived(
		selectedSecrets.masterPassword || selectedSecrets.email || selectedSecrets.authenticator
	);

	const isConfigValid = $derived(threshold >= 2 && threshold <= totalShares && totalShares <= 10);

	const areSecretsValid = $derived.by(() => {
		if (selectedSecrets.masterPassword && !masterPassword.trim()) return false;
		if (selectedSecrets.email && (!email.trim() || !emailPassword.trim())) return false;
		if (
			selectedSecrets.authenticator &&
			(!authenticatorEmail.trim() ||
				!authenticatorPassword.trim() ||
				!authenticatorRecoveryKey.trim())
		)
			return false;
		return true;
	});

	const isFormValid = $derived(hasSelectedSecrets && isConfigValid && areSecretsValid);

	const feedbackMessage = $derived.by(() => {
		if (threshold === totalShares) {
			return `All ${totalShares} shares will be required to recover your secrets`;
		}
		return `Any ${threshold} of ${totalShares} shares can recover your secrets`;
	});

	async function handleGenerateShares() {
		if (!isFormValid) return;

		isGenerating = true;
		errorMessage = '';

		try {
			// Validate all inputs before processing
			if (selectedSecrets.masterPassword) {
				const masterValidation = validateInputLength(masterPassword);
				if (!masterValidation.valid) {
					errorMessage = `Master Password: ${masterValidation.error}`;
					return;
				}
			}

			if (selectedSecrets.email) {
				const emailValidation = validateInputLength(email);
				const emailPasswordValidation = validateInputLength(emailPassword);
				if (!emailValidation.valid) {
					errorMessage = `Email: ${emailValidation.error}`;
					return;
				}
				// Validate email format
				const emailFormatValidation = validateEmail(email);
				if (!emailFormatValidation.valid) {
					errorMessage = `Email: ${emailFormatValidation.error}`;
					return;
				}
				if (!emailPasswordValidation.valid) {
					errorMessage = `Email Password: ${emailPasswordValidation.error}`;
					return;
				}
			}

			if (selectedSecrets.authenticator) {
				const authEmailValidation = validateInputLength(authenticatorEmail);
				const authPasswordValidation = validateInputLength(authenticatorPassword);
				const authRecoveryValidation = validateInputLength(authenticatorRecoveryKey);
				if (!authEmailValidation.valid) {
					errorMessage = `Authenticator Email: ${authEmailValidation.error}`;
					return;
				}
				// Validate authenticator email format
				const authEmailFormatValidation = validateEmail(authenticatorEmail);
				if (!authEmailFormatValidation.valid) {
					errorMessage = `Authenticator Email: ${authEmailFormatValidation.error}`;
					return;
				}
				if (!authPasswordValidation.valid) {
					errorMessage = `Authenticator Password: ${authPasswordValidation.error}`;
					return;
				}
				if (!authRecoveryValidation.valid) {
					errorMessage = `Authenticator Recovery Key: ${authRecoveryValidation.error}`;
					return;
				}
			}

			// Bundle selected secrets into JSON
			const bundle: SecretBundle = {};
			if (selectedSecrets.masterPassword) bundle.masterPassword = masterPassword;
			if (selectedSecrets.email) {
				bundle.email = email;
				bundle.emailPassword = emailPassword;
			}
			if (selectedSecrets.authenticator) {
				bundle.authenticatorEmail = authenticatorEmail;
				bundle.authenticatorPassword = authenticatorPassword;
				bundle.authenticatorRecoveryKey = authenticatorRecoveryKey;
			}

			const bundleString = JSON.stringify(bundle);

			// Split the bundled secrets
			const shareData = await splitSecret(bundleString, totalShares, threshold);

			// Create share objects with metadata
			const shares: Share[] = shareData.map((data, index) => ({
				id: generateShareId(),
				shareNumber: index + 1,
				totalShares,
				threshold,
				data,
				created: new Date().toISOString()
			}));

			// Store shares in memory only and navigate
			await navigateToShares(shares);
		} catch (error) {
			if (error instanceof Error) {
				errorMessage = error.message;
			} else {
				errorMessage = 'Failed to generate shares. Please try again.';
			}
		} finally {
			isGenerating = false;
		}
	}
</script>

<svelte:head>
	<title>Secret Sharing Configuration - Bitwarden Emergency Kit</title>
</svelte:head>

<div class="container mx-auto max-w-4xl px-4 py-12">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="mb-2 text-3xl font-bold text-gray-900">Secret Sharing Configuration</h1>
		<p class="text-gray-600">
			Split your credentials for distributed security—share holders must work together to recover
		</p>
	</div>

	<!-- Security Warning -->
	<div class="mb-6 rounded-lg border border-red-200 bg-red-50/30 p-3 shadow-sm">
		<div class="flex items-start gap-2">
			<Shield class="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
			<div>
				<h3 class="text-sm font-semibold text-red-900">Security Notice</h3>
				<p class="text-xs text-red-800">
					All operations are performed locally in your browser. For maximum security, disconnect
					from the internet before entering secrets.
				</p>
			</div>
		</div>
	</div>

	<!-- Step 1: Select Secrets -->
	<section class="mb-6 rounded-lg bg-white p-4 shadow-sm" aria-labelledby="select-secrets-heading">
		<h2 id="select-secrets-heading" class="mb-4 text-base font-semibold text-gray-900">
			1. Select Secrets to Share
		</h2>

		<div class="space-y-3">
			<label class="flex cursor-pointer items-start gap-3 rounded-lg p-3 hover:bg-gray-50">
				<Checkbox bind:checked={selectedSecrets.masterPassword} class="mt-1" />
				<div>
					<div class="font-medium text-gray-900">Bitwarden Master Password</div>
					<div class="text-sm text-gray-600">
						The password you use to unlock your Bitwarden vault
					</div>
				</div>
			</label>

			<label class="flex cursor-pointer items-start gap-3 rounded-lg p-3 hover:bg-gray-50">
				<Checkbox bind:checked={selectedSecrets.email} class="mt-1" />
				<div>
					<div class="font-medium text-gray-900">Email Account Credentials</div>
					<div class="text-sm text-gray-600">Email address and password for account recovery</div>
				</div>
			</label>

			<label class="flex cursor-pointer items-start gap-3 rounded-lg p-3 hover:bg-gray-50">
				<Checkbox bind:checked={selectedSecrets.authenticator} class="mt-1" />
				<div>
					<div class="font-medium text-gray-900">Authenticator App Credentials</div>
					<div class="text-sm text-gray-600">
						Email, password, and recovery key for your authenticator app (e.g., Ente Auth)
					</div>
				</div>
			</label>
		</div>
	</section>

	<!-- Step 2: Configure Sharing -->
	<section class="mb-6 rounded-lg bg-white p-4 shadow-sm" aria-labelledby="config-sharing-heading">
		<h2 id="config-sharing-heading" class="mb-4 text-base font-semibold text-gray-900">
			2. Configure Share Distribution
		</h2>

		<!-- Configuration Presets -->
		<div class="mb-6">
			<p class="mb-3 text-sm font-medium text-gray-700">Quick Presets:</p>
			<div class="flex flex-wrap gap-2">
				<Button
					variant="secondary"
					size="sm"
					onclick={() => {
						totalShares = 3;
						threshold = 2;
					}}
				>
					<span class:font-semibold={totalShares === 3 && threshold === 2}>
						Trusted Circle (any 2 of 3)
					</span>
				</Button>
				<Button
					variant="secondary"
					size="sm"
					onclick={() => {
						totalShares = 5;
						threshold = 3;
					}}
				>
					<span class:font-semibold={totalShares === 5 && threshold === 3}>
						Family (any 3 of 5)
					</span>
				</Button>
				<Button
					variant="secondary"
					size="sm"
					onclick={() => {
						totalShares = 5;
						threshold = 5;
					}}
				>
					<span class:font-semibold={totalShares === 5 && threshold === 5}>
						Maximum Security (all 5 required)
					</span>
				</Button>
			</div>
		</div>

		<div class="mb-4 grid gap-6 md:grid-cols-2">
			<div>
				<label
					for="totalShares"
					class="mb-2 flex items-center gap-1 text-sm font-medium text-gray-700"
				>
					Total Shares to Create
					<Tooltip content="Total number of share pieces to create">
						<HelpCircle class="h-4 w-4 text-gray-400" />
					</Tooltip>
				</label>
				<input
					id="totalShares"
					type="number"
					bind:value={totalShares}
					min="3"
					max="10"
					class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none"
					aria-describedby="totalShares-help"
				/>
				<p id="totalShares-help" class="mt-1 text-xs text-gray-500">
					How many people will receive a share (3-10)
				</p>
			</div>

			<div>
				<label
					for="threshold"
					class="mb-2 flex items-center gap-1 text-sm font-medium text-gray-700"
				>
					Minimum Shares to Recover
					<Tooltip content="Minimum number of shares needed to recover your secrets">
						<HelpCircle class="h-4 w-4 text-gray-400" />
					</Tooltip>
				</label>
				<input
					id="threshold"
					type="number"
					bind:value={threshold}
					min="2"
					max={totalShares}
					class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none"
					aria-describedby="threshold-help"
				/>
				<p id="threshold-help" class="mt-1 text-xs text-gray-500">
					How many shares must work together to recover (2-{totalShares})
				</p>
			</div>
		</div>

		{#if isConfigValid}
			<div class="rounded-lg border border-gray-300 bg-white p-3 shadow-sm">
				<div class="flex items-start gap-2">
					<Info class="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
					<p class="text-sm text-gray-700">{feedbackMessage}</p>
				</div>
			</div>
		{:else}
			<div class="rounded-lg border border-amber-200 bg-amber-50/50 p-3 shadow-sm">
				<div class="flex items-start gap-2">
					<AlertTriangle class="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
					<p class="text-sm text-amber-800">
						Minimum shares must be between 2 and total shares (max 10)
					</p>
				</div>
			</div>
		{/if}
	</section>

	<!-- Step 3: Enter Secrets -->
	{#if hasSelectedSecrets}
		<section class="mb-6 rounded-lg bg-white p-4 shadow-sm" aria-labelledby="enter-secrets-heading">
			<h2 id="enter-secrets-heading" class="mb-4 text-base font-semibold text-gray-900">
				3. Enter Your Secrets
			</h2>

			<div class="space-y-6">
				{#if selectedSecrets.masterPassword}
					<div>
						<label for="masterPassword" class="mb-2 block text-sm font-medium text-gray-700">
							Bitwarden Master Password
						</label>
						<div class="relative">
							<input
								id="masterPassword"
								type={showMasterPassword ? 'text' : 'password'}
								bind:value={masterPassword}
								class="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:border-primary-500 focus:ring-primary-500"
								placeholder="Enter your master password"
								aria-describedby="masterPassword-hint"
							/>
							<button
								type="button"
								onclick={() => (showMasterPassword = !showMasterPassword)}
								class="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
								aria-label={showMasterPassword ? 'Hide password' : 'Show password'}
							>
								{#if showMasterPassword}
									<EyeOff class="h-5 w-5" />
								{:else}
									<Eye class="h-5 w-5" />
								{/if}
							</button>
						</div>
						<p id="masterPassword-hint" class="mt-1 text-xs text-gray-500">
							{masterPassword.length} characters
						</p>
					</div>
				{/if}

				{#if selectedSecrets.email}
					<div class="space-y-4 rounded-lg border border-gray-300 p-4">
						<h3 class="font-medium text-gray-900">Email Account</h3>

						<div>
							<label for="email" class="mb-2 block text-sm font-medium text-gray-700">
								Email Address
							</label>
							<input
								id="email"
								type="email"
								bind:value={email}
								class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500"
								placeholder="your.email@example.com"
							/>
						</div>

						<div>
							<label for="emailPassword" class="mb-2 block text-sm font-medium text-gray-700">
								Email Password
							</label>
							<div class="relative">
								<input
									id="emailPassword"
									type={showEmailPassword ? 'text' : 'password'}
									bind:value={emailPassword}
									class="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:border-primary-500 focus:ring-primary-500"
									placeholder="Enter email password"
								/>
								<button
									type="button"
									onclick={() => (showEmailPassword = !showEmailPassword)}
									class="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
								>
									{#if showEmailPassword}
										<EyeOff class="h-5 w-5" />
									{:else}
										<Eye class="h-5 w-5" />
									{/if}
								</button>
							</div>
						</div>
					</div>
				{/if}

				{#if selectedSecrets.authenticator}
					<div class="space-y-4 rounded-lg border border-gray-300 p-4">
						<h3 class="font-medium text-gray-900">Authenticator App</h3>

						<div>
							<label for="authEmail" class="mb-2 block text-sm font-medium text-gray-700">
								App Account Email
							</label>
							<input
								id="authEmail"
								type="email"
								bind:value={authenticatorEmail}
								class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500"
								placeholder="authenticator@example.com"
							/>
						</div>

						<div>
							<label for="authPassword" class="mb-2 block text-sm font-medium text-gray-700">
								App Account Password
							</label>
							<div class="relative">
								<input
									id="authPassword"
									type={showAuthPassword ? 'text' : 'password'}
									bind:value={authenticatorPassword}
									class="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:border-primary-500 focus:ring-primary-500"
									placeholder="Enter authenticator password"
								/>
								<button
									type="button"
									onclick={() => (showAuthPassword = !showAuthPassword)}
									class="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
								>
									{#if showAuthPassword}
										<EyeOff class="h-5 w-5" />
									{:else}
										<Eye class="h-5 w-5" />
									{/if}
								</button>
							</div>
						</div>

						<div>
							<label for="authRecovery" class="mb-2 block text-sm font-medium text-gray-700">
								Recovery Key / Backup Code
							</label>
							<div class="relative">
								<input
									id="authRecovery"
									type={showAuthRecovery ? 'text' : 'password'}
									bind:value={authenticatorRecoveryKey}
									class="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:border-primary-500 focus:ring-primary-500"
									placeholder="24-word recovery key or backup code"
								/>
								<button
									type="button"
									onclick={() => (showAuthRecovery = !showAuthRecovery)}
									class="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
								>
									{#if showAuthRecovery}
										<EyeOff class="h-5 w-5" />
									{:else}
										<Eye class="h-5 w-5" />
									{/if}
								</button>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</section>
	{/if}

	<!-- Error Message -->
	{#if errorMessage}
		<div
			class="mb-6 rounded-lg border border-red-200 bg-red-50 p-4"
			role="alert"
			aria-live="assertive"
		>
			<div class="flex items-start gap-3">
				<AlertTriangle class="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
				<div>
					<h3 class="mb-1 font-semibold text-red-900">Error</h3>
					<p class="text-sm text-red-800">{errorMessage}</p>
				</div>
			</div>
		</div>
	{/if}

	<!-- Generate Button -->
	<div class="flex items-center justify-between">
		<a
			href="/"
			class="rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
		>
			Cancel
		</a>
		<Button
			onclick={handleGenerateShares}
			disabled={!isFormValid || isGenerating}
			variant="accent"
			size="md"
			aria-label="Generate secret shares from credentials"
		>
			{#if isGenerating}
				<Spinner class="mr-2" />
				Generating Shares...
			{:else}
				Generate Shares
			{/if}
		</Button>
	</div>
</div>
