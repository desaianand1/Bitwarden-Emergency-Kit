<script lang="ts">
	import { onMount } from 'svelte';
	import { Printer, Shield, AlertTriangle, Info, CheckCircle, Download } from 'lucide-svelte';

	let currentDate = '';

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
		// Try to trigger the browser's save dialog
		try {
			// For most browsers, trigger Ctrl+S equivalent
			const event = new KeyboardEvent('keydown', {
				key: 's',
				ctrlKey: true,
				metaKey: true,
				bubbles: true
			});
			document.dispatchEvent(event);
		} catch (error) {
			// Fallback: show instructions
			alert(
				'To save this page offline:\n\n1. Press Ctrl+S (or Cmd+S on Mac)\n2. Choose "Web Page, Complete" or "HTML Only"\n3. Save to a secure location on your computer\n4. Disconnect from internet before opening the saved file'
			);
		}
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
<div class="screen-only mb-6 border-b border-blue-200 bg-blue-50 p-4">
	<div class="mx-auto flex max-w-4xl items-center justify-between">
		<div class="flex items-center gap-3">
			<Shield class="h-8 w-8 text-blue-600" />
			<div>
				<h1 class="text-2xl font-bold text-blue-900">Bitwarden Emergency Kit</h1>
				<p class="text-blue-700">Secure backup template for password manager recovery</p>
			</div>
		</div>
		<div class="flex gap-2">
			<button
				on:click={savePageOffline}
				class="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
			>
				<Download class="h-4 w-4" />
				Save Offline
			</button>
			<button
				on:click={handlePrint}
				class="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
			>
				<Printer class="h-4 w-4" />
				Print Emergency Kit
			</button>
		</div>
	</div>
</div>

<!-- Screen-only security notice -->
<div class="screen-only mx-auto mb-4 max-w-4xl rounded-lg border border-red-200 bg-red-50 p-6">
	<div class="flex items-start gap-3">
		<Shield class="mt-1 h-6 w-6 flex-shrink-0 text-red-600" />
		<div>
			<h2 class="mb-2 text-lg font-semibold text-red-900">🔒 Security Recommendation</h2>
			<p class="text-sm text-red-800">
				<strong>For maximum security:</strong> Save this page offline, disconnect from the internet,
				fill it out, print it, then close your browser without saving the filled form.
			</p>
		</div>
	</div>
</div>

<!-- Screen-only instructions -->
<div class="screen-only mx-auto mb-4 max-w-4xl rounded-lg border border-amber-200 bg-amber-50 p-6">
	<div class="flex items-start gap-3">
		<AlertTriangle class="mt-1 h-6 w-6 flex-shrink-0 text-amber-600" />
		<div>
			<h2 class="mb-2 text-lg font-semibold text-amber-900">Important Instructions</h2>
			<ul class="space-y-1 text-sm text-amber-800">
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
<div class="screen-only mx-auto mb-8 max-w-4xl rounded-lg border border-blue-200 bg-blue-50 p-6">
	<div class="flex items-start gap-3">
		<Info class="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" />
		<div>
			<h2 class="mb-2 text-lg font-semibold text-blue-900">📄 Print Configuration</h2>
			<p class="mb-3 text-sm text-blue-800">
				<strong>Multiple Devices/Accounts:</strong> Print one page for each device or email account you
				need to document.
			</p>
			<div class="space-y-2 text-sm text-blue-800">
				<div class="flex items-center gap-2">
					<div class="h-4 w-4 border-2 border-blue-400"></div>
					<span>Print multiple Device Access pages (check if you have multiple devices)</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="h-4 w-4 border-2 border-blue-400"></div>
					<span>Print multiple Email Account pages (check if you have multiple email accounts)</span
					>
				</div>
				<div class="flex items-center gap-2">
					<div class="h-4 w-4 border-2 border-blue-400"></div>
					<span>Print multiple copies for different storage locations</span>
				</div>
			</div>
			<p class="mt-3 text-xs text-blue-700">
				<strong>Instructions:</strong> Fill in page numbers (e.g., "Page 1 of 3") and device/account
				names clearly at the top of each page.
			</p>
		</div>
	</div>
</div>

<!-- Print-only header -->
<div class="print-only">
	<div class="mb-6 border-b-2 border-gray-800 pb-4 text-center">
		<h1 class="mb-2 text-3xl font-bold text-gray-900">BITWARDEN EMERGENCY KIT</h1>
		<p class="text-lg text-gray-700">Password Manager Recovery Information</p>
		<p class="mt-2 text-sm text-gray-600">Created: {currentDate} | Version 1.0</p>
	</div>
</div>

<!-- Main form content -->
<div class="mx-auto max-w-4xl space-y-8 p-6">
	<!-- Section 1: Bitwarden Account Information -->
	<section class="rounded-lg border-2 border-gray-300 p-6">
		<h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
			<Shield class="h-5 w-5" />
			1. Bitwarden Account Information
		</h2>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Server URL (circle one):
				</label>
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<div class="h-4 w-4 rounded-full border-2 border-gray-400"></div>
						<span class="text-sm">https://vault.bitwarden.com (US servers)</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="h-4 w-4 rounded-full border-2 border-gray-400"></div>
						<span class="text-sm">https://vault.bitwarden.eu (EU servers)</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="h-4 w-4 rounded-full border-2 border-gray-400"></div>
						<span class="text-sm">Self-hosted: ________________________</span>
					</div>
				</div>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Account Creation Date:
				</label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700"> Email Address: </label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
				<p class="mt-1 text-xs text-gray-500">The email address you use to log into Bitwarden</p>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700"> Master Password: </label>
				<div class="space-y-2">
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>
				<p class="mt-1 text-xs text-gray-500">Write clearly in block letters</p>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Password Hint (if set):
				</label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
				<p class="mt-1 text-xs text-gray-500">
					The hint you set in Bitwarden to remind you where your emergency sheet is stored
				</p>
			</div>

			<div class="form-field md:col-span-2">
				<label class="mb-2 block text-sm font-semibold text-gray-700"> 2FA Recovery Code: </label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
				<p class="mt-1 text-xs text-gray-500">
					From Settings → Security → Two-step Login → View Recovery Code
				</p>
			</div>
		</div>
	</section>

	<!-- Section 2: Email Account Backup -->
	<section class="rounded-lg border-2 border-gray-300 p-6">
		<h2 class="mb-2 flex items-center gap-2 text-xl font-bold text-gray-900">
			<Info class="h-5 w-5" />
			2. Email Account Backup
		</h2>
		<p class="mb-4 text-sm text-gray-600">
			Your Bitwarden account email and any other critical email accounts. If you lose access to
			Bitwarden, you'll need these to receive verification codes and reset access.
		</p>

		<div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
			<div class="form-field">
				<label class="mb-2 block text-xs font-semibold text-gray-700">Page Number:</label>
				<div class="flex items-center gap-2">
					<div class="h-6 w-12 border-b-2 border-gray-400"></div>
					<span class="text-xs">of</span>
					<div class="h-6 w-12 border-b-2 border-gray-400"></div>
				</div>
			</div>
			<div class="form-field">
				<label class="mb-2 block text-xs font-semibold text-gray-700">Account Name:</label>
				<div class="h-6 w-full border-b-2 border-gray-400"></div>
			</div>
			<div class="form-field">
				<label class="mb-2 block text-xs font-semibold text-gray-700">Storage Location:</label>
				<div class="h-6 w-full border-b-2 border-gray-400"></div>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700"> Email Provider URL: </label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
				<p class="mt-1 text-xs text-gray-500">e.g., gmail.com, outlook.com, protonmail.com</p>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700"> Email Password: </label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
			</div>

			<div class="form-field md:col-span-2">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Email 2FA Recovery Codes:
				</label>
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
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Alternative Email Addresses:
				</label>
				<div class="space-y-2">
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>
			</div>
		</div>
	</section>

	<!-- Section 3: Authenticator App Information -->
	<section class="rounded-lg border-2 border-gray-300 p-6">
		<h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
			<CheckCircle class="h-5 w-5" />
			3. Authenticator App Information
		</h2>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Authenticator App (circle one):
				</label>
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<div class="h-4 w-4 rounded-full border-2 border-gray-400"></div>
						<span class="text-sm">Ente Auth (recommended)</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="h-4 w-4 rounded-full border-2 border-gray-400"></div>
						<span class="text-sm">Aegis Authenticator</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="h-4 w-4 rounded-full border-2 border-gray-400"></div>
						<span class="text-sm">2FAS</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="h-4 w-4 rounded-full border-2 border-gray-400"></div>
						<span class="text-sm">Other: ________________________</span>
					</div>
				</div>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700"> App Account Email: </label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					App Account Password:
				</label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Recovery Key/Backup Code:
				</label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
				<p class="mt-1 text-xs text-gray-500">
					For Ente Auth: 24-word recovery key from account setup
				</p>
			</div>

			<div class="form-field md:col-span-2">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Export File Location Notes:
				</label>
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
	<section class="rounded-lg border-2 border-gray-300 p-6">
		<h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
			<Shield class="h-5 w-5" />
			4. Encrypted Exports & Backups
		</h2>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Bitwarden Vault Export Password:
				</label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
				<p class="mt-1 text-xs text-gray-500">
					Password for encrypted JSON vault exports (6+ word passphrase recommended)
				</p>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					TOTP Export Encryption Key:
				</label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
				<p class="mt-1 text-xs text-gray-500">
					Password/key for encrypted authenticator app exports
				</p>
			</div>

			<div class="form-field md:col-span-2">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Vault Export File Locations:
				</label>
				<div class="space-y-2">
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>
				<p class="mt-1 text-xs text-gray-500">
					Full paths to encrypted vault exports (e.g., C:\Backups\bitwarden_2025-01-24.json)
				</p>
			</div>

			<div class="form-field md:col-span-2">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					TOTP Export File Locations:
				</label>
				<div class="space-y-2">
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>
				<p class="mt-1 text-xs text-gray-500">
					Full paths to encrypted TOTP exports from Ente Auth or other apps
				</p>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					VeraCrypt Container Password:
				</label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
				<p class="mt-1 text-xs text-gray-500">Password for VeraCrypt encrypted backup containers</p>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Backup Creation Date:
				</label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					USB Drive #1 Location:
				</label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
				<p class="mt-1 text-xs text-gray-500">Where the first backup USB drive is stored</p>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					USB Drive #2 Location (Offsite):
				</label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
				<p class="mt-1 text-xs text-gray-500">
					Where the second backup USB drive is stored (different location)
				</p>
			</div>

			<div class="form-field md:col-span-2">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Decryption Instructions:
				</label>
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
	<section class="rounded-lg border-2 border-gray-300 p-6">
		<h2 class="mb-2 text-xl font-bold text-gray-900">5. Device Access Information</h2>
		<p class="mb-4 text-sm text-gray-600">
			Critical device passwords needed to access your devices in an emergency. Include login
			passwords, PINs, and biometric backup methods for devices where Bitwarden is installed.
		</p>

		<div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
			<div class="form-field">
				<label class="mb-2 block text-xs font-semibold text-gray-700">Page Number:</label>
				<div class="flex items-center gap-2">
					<div class="h-6 w-12 border-b-2 border-gray-400"></div>
					<span class="text-xs">of</span>
					<div class="h-6 w-12 border-b-2 border-gray-400"></div>
				</div>
			</div>
			<div class="form-field">
				<label class="mb-2 block text-xs font-semibold text-gray-700">Device Name:</label>
				<div class="h-6 w-full border-b-2 border-gray-400"></div>
			</div>
			<div class="form-field">
				<label class="mb-2 block text-xs font-semibold text-gray-700">Storage Location:</label>
				<div class="h-6 w-full border-b-2 border-gray-400"></div>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Computer Login Password:
				</label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700"> Phone PIN/Password: </label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Hardware Security Key PIN:
				</label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Biometric Backup Method:
				</label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
				<p class="mt-1 text-xs text-gray-500">
					Alternative unlock method if biometrics fail (e.g., "Fingerprint + PIN 1234")
				</p>
			</div>
		</div>
	</section>

	<!-- Section 6: Emergency Contacts -->
	<section class="rounded-lg border-2 border-gray-300 p-6">
		<h2 class="mb-4 text-xl font-bold text-gray-900">6. Emergency Contacts</h2>

		<div class="space-y-6">
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div class="form-field">
					<label class="mb-2 block text-sm font-semibold text-gray-700">
						Trusted Person Name:
					</label>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>

				<div class="form-field">
					<label class="mb-2 block text-sm font-semibold text-gray-700"> Relationship: </label>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>

				<div class="form-field">
					<label class="mb-2 block text-sm font-semibold text-gray-700"> Phone Number: </label>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>

				<div class="form-field">
					<label class="mb-2 block text-sm font-semibold text-gray-700"> Email Address: </label>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Executor/Estate Contact:
				</label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Instructions for Emergency Access:
				</label>
				<div class="space-y-2">
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>
			</div>
		</div>
	</section>

	<!-- Section 7: Storage and Maintenance -->
	<section class="rounded-lg border-2 border-gray-300 p-6">
		<h2 class="mb-4 text-xl font-bold text-gray-900">7. Storage and Maintenance</h2>

		<div class="space-y-6">
			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700"> Copy #1 Location: </label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Copy #2 Location (Offsite):
				</label>
				<div class="h-8 w-full border-b-2 border-gray-400"></div>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Access Instructions for Family:
				</label>
				<div class="space-y-2">
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>
			</div>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div class="form-field">
					<label class="mb-2 block text-sm font-semibold text-gray-700"> Last Updated: </label>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>

				<div class="form-field">
					<label class="mb-2 block text-sm font-semibold text-gray-700"> Next Review Date: </label>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Testing Checklist (check when completed):
				</label>
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
	<section class="rounded-lg border-2 border-gray-300 p-6">
		<h2 class="mb-4 text-xl font-bold text-gray-900">8. Additional Notes</h2>

		<div class="space-y-4">
			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Special Instructions:
				</label>
				<div class="space-y-2">
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Custom Recovery Procedures:
				</label>
				<div class="space-y-2">
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>
			</div>

			<div class="form-field">
				<label class="mb-2 block text-sm font-semibold text-gray-700">
					Important Account Information:
				</label>
				<div class="space-y-2">
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
					<div class="h-8 w-full border-b-2 border-gray-400"></div>
				</div>
			</div>
		</div>
	</section>
</div>

<!-- Print-only footer -->
<div class="print-only mt-8 border-t-2 border-gray-300 pt-4 text-center text-sm text-gray-600">
	<p>
		<strong>IMPORTANT:</strong> Store this document securely. Make multiple copies in different locations.
	</p>
	<p>Test all information before storing. Update immediately when any information changes.</p>
	<p class="mt-2">Generated by Bitwarden Emergency Kit Tool | Version 1.0 | {currentDate}</p>
</div>

<style>
	/* Print-specific styles */
	@media print {
		.screen-only {
			display: none !important;
		}

		.print-only {
			display: block !important;
		}

		body {
			font-size: 12pt;
			line-height: 1.4;
			color: black;
		}

		.form-field label {
			font-size: 10pt;
			font-weight: bold;
		}

		.border-b-2 {
			border-bottom: 2px solid #000 !important;
			min-height: 20pt;
		}

		.border-2 {
			border: 2px solid #000 !important;
		}

		section {
			page-break-inside: avoid;
			margin-bottom: 20pt;
		}

		/* Ensure proper spacing for handwriting */
		.form-field {
			margin-bottom: 15pt;
		}

		/* High contrast for printing */
		h1,
		h2,
		h3 {
			color: #000 !important;
		}

		.text-gray-700,
		.text-gray-900 {
			color: #000 !important;
		}

		.text-gray-500,
		.text-gray-600 {
			color: #333 !important;
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
