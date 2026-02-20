<script lang="ts">
	import { onMount } from 'svelte';
	import { Printer, Shield, AlertTriangle, Info, Download, Minus, Plus } from 'lucide-svelte';
	import { Button, Dialog, Label } from '$lib/components/ui';
	import { RadioGroup, useId } from 'bits-ui';

	let currentDate = $state('');
	let showSaveDialog = $state(false);
	let serverChoice = $state('');
	let authenticatorChoice = $state('');

	let emailSections = $state([{ id: crypto.randomUUID() }]);
	let deviceSections = $state([{ id: crypto.randomUUID() }]);
	let kitCopies = $state(1);

	function addEmailSection() {
		emailSections = [...emailSections, { id: crypto.randomUUID() }];
	}

	function removeEmailSection(id: string) {
		if (emailSections.length > 1) {
			emailSections = emailSections.filter((s) => s.id !== id);
		}
	}

	function addDeviceSection() {
		deviceSections = [...deviceSections, { id: crypto.randomUUID() }];
	}

	function removeDeviceSection(id: string) {
		if (deviceSections.length > 1) {
			deviceSections = deviceSections.filter((s) => s.id !== id);
		}
	}

	onMount(() => {
		currentDate = new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	});

	function handlePrint() {
		window.print();
	}

	function savePageOffline() {
		// Create a blob with the current page HTML
		const htmlContent = document.documentElement.outerHTML;
		const blob = new Blob([htmlContent], { type: 'text/html' });

		// Create download link
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `bitwarden-emergency-kit-${new Date().toISOString().split('T')[0]}.html`;

		// Trigger download
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);

		// Show dialog with instructions
		showSaveDialog = true;
	}
</script>

<svelte:head>
	<title>Bitwarden Emergency Kit</title>
	<meta
		name="description"
		content="Printable emergency kit template for Bitwarden password manager backup and recovery"
	/>
</svelte:head>

<!-- Screen-only header -->
<div class="screen-only mx-auto my-6 max-w-4xl px-4">
	<div class="flex items-center justify-end gap-2">
		<Button onclick={savePageOffline} variant="secondary" size="md">
			<span class="flex items-center justify-center gap-2">
				<Download class="mr-2 h-4 w-4" />
				Save Offline
			</span>
		</Button>
		<Button onclick={handlePrint} variant="primary" size="md">
			<span class="flex items-center justify-center gap-2">
				<Printer class="mr-2 h-4 w-4" />
				Print Kit
			</span>
		</Button>
	</div>
</div>

<!-- Screen-only security notice -->
<div
	class="screen-only mx-auto mb-6 max-w-4xl rounded-lg border border-red-200 bg-red-50/30 p-3 shadow-sm"
>
	<div class="flex items-start gap-2">
		<Shield class="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
		<div>
			<h3 class="text-sm font-semibold text-red-900">Security Notice</h3>
			<p class="text-xs text-red-800">
				For maximum security: Save this page offline, disconnect from the internet, fill it out,
				print it, then close your browser without saving the filled form.
			</p>
		</div>
	</div>
</div>

<!-- Screen-only instructions -->
<div
	class="screen-only mx-auto mb-6 max-w-4xl rounded-lg border border-amber-200 bg-amber-50/50 p-3 shadow-sm"
>
	<div class="flex items-start gap-2">
		<AlertTriangle class="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
		<div>
			<h3 class="mb-1 text-sm font-semibold text-amber-900">Important Instructions</h3>
			<ul class="space-y-1 text-xs text-amber-800">
				<li>• <strong>Fill out by hand</strong> with a reliable pen after printing</li>
				<li>• <strong>Test all information</strong> by logging in before storing</li>
				<li>• <strong>Store securely</strong> with other important documents</li>
				<li>• <strong>Make multiple copies</strong> in different locations</li>
				<li>• <strong>Update immediately</strong> when any information changes</li>
			</ul>
		</div>
	</div>
</div>

<!-- Screen-only multi-page configuration -->
<section class="screen-only mx-auto mb-6 max-w-4xl rounded-lg bg-white p-4 shadow-sm">
	<div class="mb-4 flex items-center gap-2">
		<Info class="h-5 w-5 text-primary-600" />
		<h2 class="text-base font-semibold text-gray-900">Print Configuration</h2>
	</div>

	<div class="space-y-4">
		<!-- Email Sections Stepper -->
		<div>
			<div class="mb-2 flex items-center justify-between">
				<span class="text-sm font-medium text-gray-700">Email Account Sections</span>
				<div class="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-3 py-1.5">
					<button
						onclick={() =>
							emailSections.length > 1 &&
							removeEmailSection(emailSections[emailSections.length - 1].id)}
						disabled={emailSections.length <= 1}
						class="rounded p-1 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-30"
						aria-label="Decrease email sections"
					>
						<Minus class="h-4 w-4" />
					</button>
					<span class="min-w-[2ch] text-center text-sm font-semibold text-gray-900">
						{emailSections.length}
					</span>
					<button
						onclick={addEmailSection}
						disabled={emailSections.length >= 5}
						class="rounded p-1 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-30"
						aria-label="Increase email sections"
					>
						<Plus class="h-4 w-4" />
					</button>
				</div>
			</div>
			<p class="text-xs text-gray-500">
				{emailSections.length}
				{emailSections.length === 1 ? 'page' : 'pages'} will be printed
			</p>
		</div>

		<!-- Device Sections Stepper -->
		<div>
			<div class="mb-2 flex items-center justify-between">
				<span class="text-sm font-medium text-gray-700">Device Access Sections</span>
				<div class="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-3 py-1.5">
					<button
						onclick={() =>
							deviceSections.length > 1 &&
							removeDeviceSection(deviceSections[deviceSections.length - 1].id)}
						disabled={deviceSections.length <= 1}
						class="rounded p-1 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-30"
						aria-label="Decrease device sections"
					>
						<Minus class="h-4 w-4" />
					</button>
					<span class="min-w-[2ch] text-center text-sm font-semibold text-gray-900">
						{deviceSections.length}
					</span>
					<button
						onclick={addDeviceSection}
						disabled={deviceSections.length >= 5}
						class="rounded p-1 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-30"
						aria-label="Increase device sections"
					>
						<Plus class="h-4 w-4" />
					</button>
				</div>
			</div>
			<p class="text-xs text-gray-500">
				{deviceSections.length}
				{deviceSections.length === 1 ? 'page' : 'pages'} will be printed
			</p>
		</div>

		<!-- Kit Copies Stepper -->
		<div>
			<div class="mb-2 flex items-center justify-between">
				<span class="text-sm font-medium text-gray-700">Complete Kit Copies</span>
				<div class="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-3 py-1.5">
					<button
						onclick={() => kitCopies > 1 && kitCopies--}
						disabled={kitCopies <= 1}
						class="rounded p-1 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-30"
						aria-label="Decrease copies"
					>
						<Minus class="h-4 w-4" />
					</button>
					<span class="min-w-[2ch] text-center text-sm font-semibold text-gray-900">
						{kitCopies}
					</span>
					<button
						onclick={() => kitCopies < 5 && kitCopies++}
						disabled={kitCopies >= 5}
						class="rounded p-1 text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-30"
						aria-label="Increase copies"
					>
						<Plus class="h-4 w-4" />
					</button>
				</div>
			</div>
			<p class="text-xs text-gray-500">Print entire kit multiple times for different locations</p>
		</div>

		<p class="text-xs text-gray-500">
			Total pages: {(emailSections.length + deviceSections.length + 6) * kitCopies}
		</p>
	</div>
</section>

<!-- Print-only header -->
<div class="print-only">
	<div class="mb-6 border-b-2 border-gray-800 pb-4 text-center">
		<h1 class="mb-2 text-3xl font-bold text-gray-900">BITWARDEN EMERGENCY KIT</h1>
		<p class="text-lg text-gray-700">Password Manager Recovery Information</p>
		<p class="mt-2 text-sm text-gray-600">Created: {currentDate} | Version 1.0</p>
	</div>
</div>

<!-- Main form content -->
{#each Array(kitCopies) as _copy, copyIndex (copyIndex)}
	<div
		class="mx-auto max-w-4xl space-y-8 p-6 print:max-w-none print:space-y-6 print:p-0 {copyIndex > 0
			? 'kit-copy'
			: ''}"
	>
		{#if kitCopies > 1}
			<div class="print-only mb-4 text-center text-sm font-bold text-gray-700">
				COPY {copyIndex + 1} of {kitCopies}
			</div>
		{/if}
		<!-- Section 1: Bitwarden Account Information -->
		<section
			class="rounded-lg border border-gray-300 bg-white p-4 print:mb-6 print:break-inside-avoid print:border-black"
		>
			<h3
				class="mb-3 border-b border-gray-300 pb-2 text-sm font-semibold text-gray-900 print:border-black"
			>
				1. Bitwarden Account Information
			</h3>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">Server URL (circle one):</div>
					<RadioGroup.Root bind:value={serverChoice} class="space-y-2">
						{@const usId = useId()}
						{@const euId = useId()}
						{@const selfId = useId()}
						<div class="flex items-center gap-2">
							<RadioGroup.Item
								id={usId}
								value="us"
								class="h-4 w-4 cursor-pointer rounded-full border-2 border-gray-400 data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600"
							/>
							<Label for={usId} class="cursor-pointer text-sm">
								https://vault.bitwarden.com (US servers)
							</Label>
						</div>
						<div class="flex items-center gap-2">
							<RadioGroup.Item
								id={euId}
								value="eu"
								class="h-4 w-4 cursor-pointer rounded-full border-2 border-gray-400 data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600"
							/>
							<Label for={euId} class="cursor-pointer text-sm">
								https://vault.bitwarden.eu (EU servers)
							</Label>
						</div>
						<div class="flex items-center gap-2">
							<RadioGroup.Item
								id={selfId}
								value="self"
								class="h-4 w-4 cursor-pointer rounded-full border-2 border-gray-400 data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600"
							/>
							<Label for={selfId} class="cursor-pointer text-sm">
								Self-hosted: ________________________
							</Label>
						</div>
					</RadioGroup.Root>
				</div>

				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">Account Creation Date:</div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>

				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">Email Address:</div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<p class="mt-1 text-xs text-gray-500">The email address you use to log into Bitwarden</p>
				</div>

				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">Master Password:</div>
					<div class="space-y-2">
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
					</div>
					<p class="mt-1 text-xs text-gray-500">Write clearly in block letters</p>
				</div>

				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">Password Hint (if set):</div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<p class="mt-1 text-xs text-gray-500">
						The hint you set in Bitwarden to remind you where your emergency sheet is stored
					</p>
				</div>

				<div class="form-field md:col-span-2">
					<div class="mb-2 block text-sm font-semibold text-gray-700">2FA Recovery Code:</div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<p class="mt-1 text-xs text-gray-500">
						From Settings → Security → Two-step Login → View Recovery Code
					</p>
				</div>
			</div>
		</section>

		<!-- Section 2: Email Account Backup -->
		{#each emailSections as section, index (section.id)}
			<section
				class="rounded-lg border border-gray-300 bg-white p-4 print:mb-6 print:break-before-auto print:break-inside-avoid print:border-black"
			>
				<div class="mb-2 flex items-center justify-between">
					<h3
						class="border-b border-gray-300 pb-2 text-sm font-semibold text-gray-900 print:border-black"
					>
						2. Email Account Backup {emailSections.length > 1
							? `(${index + 1} of ${emailSections.length})`
							: ''}
					</h3>
					{#if emailSections.length > 1}
						<Button
							onclick={() => removeEmailSection(section.id)}
							variant="ghost"
							size="sm"
							class="screen-only"
						>
							Remove
						</Button>
					{/if}
				</div>
				<p class="mb-4 text-sm text-gray-600">
					Your Bitwarden account email and any other critical email accounts. If you lose access to
					Bitwarden, you'll need these to receive verification codes and reset access.
				</p>

				<div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
					<div class="form-field">
						<div class="mb-2 block text-xs font-semibold text-gray-700">Page Number:</div>
						<div class="flex items-center gap-2">
							<div class="h-6 w-12 border-b-2 border-gray-400"></div>
							<span class="text-xs">of</span>
							<div class="h-6 w-12 border-b-2 border-gray-400"></div>
						</div>
					</div>
					<div class="form-field">
						<div class="mb-2 block text-xs font-semibold text-gray-700">Account Name:</div>
						<div class="h-6 w-full border-b-2 border-gray-400"></div>
					</div>
					<div class="form-field">
						<div class="mb-2 block text-xs font-semibold text-gray-700">Storage Location:</div>
						<div class="h-6 w-full border-b-2 border-gray-400"></div>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div class="form-field">
						<div class="mb-2 block text-sm font-semibold text-gray-700">Email Provider URL:</div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
						<p class="mt-1 text-xs text-gray-500">e.g., gmail.com, outlook.com, protonmail.com</p>
					</div>

					<div class="form-field">
						<div class="mb-2 block text-sm font-semibold text-gray-700">Email Password:</div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
					</div>

					<div class="form-field md:col-span-2">
						<div class="mb-2 block text-sm font-semibold text-gray-700">
							Email 2FA Recovery Codes:
						</div>
						<div class="grid grid-cols-2 gap-4">
							<div class="space-y-2">
								<div class="flex items-center gap-2">
									<div class="h-3 w-3 border border-gray-400"></div>
									<div class="h-8 flex-1 border-b-2 border-gray-400"></div>
								</div>
								<div class="flex items-center gap-2">
									<div class="h-3 w-3 border border-gray-400"></div>
									<div class="h-8 flex-1 border-b-2 border-gray-400"></div>
								</div>
								<div class="flex items-center gap-2">
									<div class="h-3 w-3 border border-gray-400"></div>
									<div class="h-8 flex-1 border-b-2 border-gray-400"></div>
								</div>
								<div class="flex items-center gap-2">
									<div class="h-3 w-3 border border-gray-400"></div>
									<div class="h-8 flex-1 border-b-2 border-gray-400"></div>
								</div>
							</div>
							<div class="space-y-2">
								<div class="flex items-center gap-2">
									<div class="h-3 w-3 border border-gray-400"></div>
									<div class="h-8 flex-1 border-b-2 border-gray-400"></div>
								</div>
								<div class="flex items-center gap-2">
									<div class="h-3 w-3 border border-gray-400"></div>
									<div class="h-8 flex-1 border-b-2 border-gray-400"></div>
								</div>
								<div class="flex items-center gap-2">
									<div class="h-3 w-3 border border-gray-400"></div>
									<div class="h-8 flex-1 border-b-2 border-gray-400"></div>
								</div>
								<div class="flex items-center gap-2">
									<div class="h-3 w-3 border border-gray-400"></div>
									<div class="h-8 flex-1 border-b-2 border-gray-400"></div>
								</div>
							</div>
						</div>
						<p class="mt-1 text-xs text-gray-500">
							Check box when code is used (each can only be used once)
						</p>
					</div>

					<div class="form-field md:col-span-2">
						<div class="mb-2 block text-sm font-semibold text-gray-700">
							Alternative Email Addresses:
						</div>
						<div class="space-y-2">
							<div class="h-8 w-full border-b-2 border-gray-400"></div>
							<div class="h-8 w-full border-b-2 border-gray-400"></div>
						</div>
					</div>
				</div>
			</section>
		{/each}

		<!-- Section 3: Authenticator App Information -->
		<section
			class="rounded-lg border border-gray-300 bg-white p-4 print:mb-6 print:break-before-auto print:break-inside-avoid print:border-black"
		>
			<h3
				class="mb-3 border-b border-gray-300 pb-2 text-sm font-semibold text-gray-900 print:break-after-avoid print:border-black"
			>
				3. Authenticator App Information
			</h3>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">
						Authenticator App (circle one):
					</div>
					<RadioGroup.Root bind:value={authenticatorChoice} class="space-y-2">
						{@const enteId = useId()}
						{@const aegisId = useId()}
						{@const tfasId = useId()}
						{@const otherId = useId()}
						<div class="flex items-center gap-2">
							<RadioGroup.Item
								id={enteId}
								value="ente"
								class="h-4 w-4 cursor-pointer rounded-full border-2 border-gray-400 data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600"
							/>
							<Label for={enteId} class="cursor-pointer text-sm">Ente Auth (recommended)</Label>
						</div>
						<div class="flex items-center gap-2">
							<RadioGroup.Item
								id={aegisId}
								value="aegis"
								class="h-4 w-4 cursor-pointer rounded-full border-2 border-gray-400 data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600"
							/>
							<Label for={aegisId} class="cursor-pointer text-sm">Aegis Authenticator</Label>
						</div>
						<div class="flex items-center gap-2">
							<RadioGroup.Item
								id={tfasId}
								value="2fas"
								class="h-4 w-4 cursor-pointer rounded-full border-2 border-gray-400 data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600"
							/>
							<Label for={tfasId} class="cursor-pointer text-sm">2FAS</Label>
						</div>
						<div class="flex items-center gap-2">
							<RadioGroup.Item
								id={otherId}
								value="other"
								class="h-4 w-4 cursor-pointer rounded-full border-2 border-gray-400 data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600"
							/>
							<Label for={otherId} class="cursor-pointer text-sm">
								Other: ________________________
							</Label>
						</div>
					</RadioGroup.Root>
				</div>

				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">App Account Email:</div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>

				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">App Account Password:</div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>

				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">
						Recovery Key/Backup Code:
					</div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<p class="mt-1 text-xs text-gray-500">
						For Ente Auth: 24-word recovery key from account setup
					</p>
				</div>

				<div class="form-field md:col-span-2">
					<div class="mb-2 block text-sm font-semibold text-gray-700">
						Export File Location Notes:
					</div>
					<div class="space-y-2">
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
					</div>
					<p class="mt-1 text-xs text-gray-500">
						Where you've stored backup exports of your authenticator codes
					</p>
				</div>
			</div>
		</section>

		<!-- Section 4: Encrypted Exports & Backups -->
		<section
			class="print:break-before-always rounded-lg border border-gray-300 bg-white p-4 print:mb-6 print:break-inside-avoid print:border-black"
		>
			<h3
				class="mb-3 border-b border-gray-300 pb-2 text-sm font-semibold text-gray-900 print:break-after-avoid print:border-black"
			>
				4. Encrypted Exports & Backups
			</h3>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">
						Bitwarden Vault Export Password:
					</div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<p class="mt-1 text-xs text-gray-500">
						Password for encrypted JSON vault exports (6+ word passphrase recommended)
					</p>
				</div>

				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">
						TOTP Export Encryption Key:
					</div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<p class="mt-1 text-xs text-gray-500">
						Password/key for encrypted authenticator app exports
					</p>
				</div>

				<div class="form-field md:col-span-2">
					<div class="mb-2 block text-sm font-semibold text-gray-700">
						Vault Export File Locations:
					</div>
					<div class="space-y-2">
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
					</div>
					<p class="mt-1 text-xs text-gray-500">
						Full paths to encrypted vault exports (e.g., C:\Backups\bitwarden_2025-01-24.json)
					</p>
				</div>

				<div class="form-field md:col-span-2">
					<div class="mb-2 block text-sm font-semibold text-gray-700">
						TOTP Export File Locations:
					</div>
					<div class="space-y-2">
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
					</div>
					<p class="mt-1 text-xs text-gray-500">
						Full paths to encrypted TOTP exports from Ente Auth or other apps
					</p>
				</div>

				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">
						VeraCrypt Container Password:
					</div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<p class="mt-1 text-xs text-gray-500">
						Password for VeraCrypt encrypted backup containers
					</p>
				</div>

				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">Backup Creation Date:</div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>

				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">USB Drive #1 Location:</div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<p class="mt-1 text-xs text-gray-500">Where the first backup USB drive is stored</p>
				</div>

				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">
						USB Drive #2 Location (Offsite):
					</div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<p class="mt-1 text-xs text-gray-500">
						Where the second backup USB drive is stored (different location)
					</p>
				</div>

				<div class="form-field md:col-span-2">
					<div class="mb-2 block text-sm font-semibold text-gray-700">Decryption Instructions:</div>
					<div class="space-y-2">
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
					</div>
					<p class="mt-1 text-xs text-gray-500">
						Step-by-step instructions for family members to decrypt and access backups
					</p>
				</div>
			</div>
		</section>

		<!-- Section 5: Device Access Information -->
		{#each deviceSections as section, index (section.id)}
			<section
				class="print:break-before-always rounded-lg border border-gray-300 bg-white p-4 print:mb-6 print:break-inside-avoid print:border-black"
			>
				<div class="mb-2 flex items-center justify-between">
					<h3
						class="border-b border-gray-300 pb-2 text-sm font-semibold text-gray-900 print:break-after-avoid print:border-black"
					>
						5. Device Access Information {deviceSections.length > 1
							? `(${index + 1} of ${deviceSections.length})`
							: ''}
					</h3>
					{#if deviceSections.length > 1}
						<Button
							onclick={() => removeDeviceSection(section.id)}
							variant="ghost"
							size="sm"
							class="screen-only"
						>
							Remove
						</Button>
					{/if}
				</div>
				<p class="mb-4 text-sm text-gray-600">
					Critical device passwords needed to access your devices in an emergency. Include login
					passwords, PINs, and biometric backup methods for devices where Bitwarden is installed.
				</p>

				<div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
					<div class="form-field">
						<div class="mb-2 block text-xs font-semibold text-gray-700">Page Number:</div>
						<div class="flex items-center gap-2">
							<div class="h-6 w-12 border-b-2 border-gray-400"></div>
							<span class="text-xs">of</span>
							<div class="h-6 w-12 border-b-2 border-gray-400"></div>
						</div>
					</div>
					<div class="form-field">
						<div class="mb-2 block text-xs font-semibold text-gray-700">Device Name:</div>
						<div class="h-6 w-full border-b-2 border-gray-400"></div>
					</div>
					<div class="form-field">
						<div class="mb-2 block text-xs font-semibold text-gray-700">Storage Location:</div>
						<div class="h-6 w-full border-b-2 border-gray-400"></div>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div class="form-field">
						<div class="mb-2 block text-sm font-semibold text-gray-700">
							Computer Login Password:
						</div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
					</div>

					<div class="form-field">
						<div class="mb-2 block text-sm font-semibold text-gray-700">Phone PIN/Password:</div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
					</div>

					<div class="form-field">
						<div class="mb-2 block text-sm font-semibold text-gray-700">
							Hardware Security Key PIN:
						</div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
					</div>

					<div class="form-field">
						<div class="mb-2 block text-sm font-semibold text-gray-700">
							Biometric Backup Method:
						</div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
						<p class="mt-1 text-xs text-gray-500">
							Alternative unlock method if biometrics fail (e.g., "Fingerprint + PIN 1234")
						</p>
					</div>
				</div>
			</section>
		{/each}

		<!-- Section 6: Emergency Contacts -->
		<section
			class="rounded-lg border border-gray-300 bg-white p-4 print:mb-6 print:break-before-auto print:break-inside-avoid print:border-black"
		>
			<h3
				class="mb-3 border-b border-gray-300 pb-2 text-sm font-semibold text-gray-900 print:break-after-avoid print:border-black"
			>
				6. Emergency Contacts
			</h3>

			<div class="space-y-6">
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div class="form-field">
						<div class="mb-2 block text-sm font-semibold text-gray-700">Trusted Person Name:</div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
					</div>

					<div class="form-field">
						<div class="mb-2 block text-sm font-semibold text-gray-700">Relationship:</div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
					</div>

					<div class="form-field">
						<div class="mb-2 block text-sm font-semibold text-gray-700">Phone Number:</div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
					</div>

					<div class="form-field">
						<div class="mb-2 block text-sm font-semibold text-gray-700">Email Address:</div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
					</div>
				</div>

				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">Executor/Estate Contact:</div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>

				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">
						Instructions for Emergency Access:
					</div>
					<div class="space-y-2">
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
					</div>
				</div>
			</div>
		</section>

		<!-- Section 7: Storage and Maintenance -->
		<section
			class="rounded-lg border border-gray-300 bg-white p-4 print:mb-6 print:break-before-auto print:break-inside-avoid print:border-black"
		>
			<h3
				class="mb-3 border-b border-gray-300 pb-2 text-sm font-semibold text-gray-900 print:break-after-avoid print:border-black"
			>
				7. Storage and Maintenance
			</h3>

			<div class="space-y-6">
				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">Copy #1 Location:</div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>

				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">
						Copy #2 Location (Offsite):
					</div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>

				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">
						Access Instructions for Family:
					</div>
					<div class="space-y-2">
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
					</div>
				</div>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div class="form-field">
						<div class="mb-2 block text-sm font-semibold text-gray-700">Last Updated:</div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
					</div>

					<div class="form-field">
						<div class="mb-2 block text-sm font-semibold text-gray-700">Next Review Date:</div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
					</div>
				</div>

				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">
						Testing Checklist (check when completed):
					</div>
					<div class="space-y-2 text-sm">
						<div class="flex items-center gap-2">
							<div class="h-4 w-4 border-2 border-gray-400"></div>
							<span>Successfully logged into Bitwarden using this information</span>
						</div>
						<div class="flex items-center gap-2">
							<div class="h-4 w-4 border-2 border-gray-400"></div>
							<span>Successfully accessed email account</span>
						</div>
						<div class="flex items-center gap-2">
							<div class="h-4 w-4 border-2 border-gray-400"></div>
							<span>Verified 2FA recovery codes work</span>
						</div>
						<div class="flex items-center gap-2">
							<div class="h-4 w-4 border-2 border-gray-400"></div>
							<span>Family member can locate and read this sheet</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Section 8: Notes -->
		<section
			class="rounded-lg border border-gray-300 bg-white p-4 print:mb-6 print:break-before-auto print:break-inside-avoid print:border-black"
		>
			<h3
				class="mb-3 border-b border-gray-300 pb-2 text-sm font-semibold text-gray-900 print:break-after-avoid print:border-black"
			>
				8. Additional Notes
			</h3>

			<div class="space-y-4">
				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">Special Instructions:</div>
					<div class="space-y-2">
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
					</div>
				</div>

				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">
						Custom Recovery Procedures:
					</div>
					<div class="space-y-2">
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
					</div>
				</div>

				<div class="form-field">
					<div class="mb-2 block text-sm font-semibold text-gray-700">
						Important Account Information:
					</div>
					<div class="space-y-2">
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
						<div class="h-8 w-full border-b-2 border-gray-400"></div>
					</div>
				</div>
			</div>
		</section>
	</div>
{/each}

<!-- Print-only footer -->
<div class="print-only mt-8 border-t-2 border-gray-300 pt-4 text-center text-sm text-gray-600">
	<p>
		<strong>IMPORTANT:</strong> Store this document securely. Make multiple copies in different locations.
	</p>
	<p>Test all information before storing. Update immediately when any information changes.</p>
	<p class="mt-2">Generated by Bitwarden Emergency Kit Tool | Version 1.0 | {currentDate}</p>
</div>

<!-- Success Dialog -->
<Dialog bind:open={showSaveDialog} title="Emergency Kit Saved Successfully!">
	<div class="space-y-3 text-sm text-gray-700">
		<p class="font-semibold">Security Instructions:</p>
		<ol class="list-decimal space-y-2 pl-5">
			<li>The file has been downloaded to your computer</li>
			<li>Disconnect from the internet before opening the saved file</li>
			<li>Fill out the form offline for maximum security</li>
			<li>Delete the file from your computer after printing</li>
		</ol>
	</div>
	<div class="mt-4">
		<Button onclick={() => (showSaveDialog = false)} variant="primary" size="md" class="w-full">
			Got it
		</Button>
	</div>
</Dialog>

<style>
	/* Print-specific styles for forms - common print styles in app.css */
	@media print {
		.print-only {
			margin: 0 !important;
			padding: 0 !important;
		}

		.print-only:first-child {
			margin-top: 0 !important;
			padding-top: 0 !important;
		}

		.form-field div {
			font-size: 10pt;
			font-weight: bold;
		}

		.border-b-2 {
			min-height: 20pt;
		}

		.form-field {
			margin-bottom: 15pt;
		}

		.mx-auto.max-w-4xl.space-y-8.p-6 {
			padding-top: 0 !important;
			margin-top: 0 !important;
		}

		.kit-copy {
			page-break-before: always;
		}
	}

	/* Screen-only styles */
	@media screen {
		.print-only {
			display: none;
		}

		.screen-only {
			display: block;
		}
	}

	/* Form field styling */
	.form-field {
		margin-bottom: 1rem;
	}

	.border-b-2 {
		border-bottom-width: 2px;
		border-bottom-style: solid;
	}
</style>
