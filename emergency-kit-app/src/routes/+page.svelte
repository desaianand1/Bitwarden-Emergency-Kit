<script lang="ts">
	import { onMount } from 'svelte';
	import { Printer, Shield, AlertTriangle, Info, CheckCircle } from 'lucide-svelte';

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
</script>

<svelte:head>
	<title>Bitwarden Emergency Kit</title>
	<meta name="description" content="Printable emergency kit template for Bitwarden password manager backup and recovery" />
</svelte:head>

<!-- Screen-only header -->
<div class="screen-only bg-blue-50 border-b border-blue-200 p-4 mb-6">
	<div class="max-w-4xl mx-auto flex items-center justify-between">
		<div class="flex items-center gap-3">
			<Shield class="w-8 h-8 text-blue-600" />
			<div>
				<h1 class="text-2xl font-bold text-blue-900">Bitwarden Emergency Kit</h1>
				<p class="text-blue-700">Secure backup template for password manager recovery</p>
			</div>
		</div>
		<button
			on:click={handlePrint}
			class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
		>
			<Printer class="w-4 h-4" />
			Print Emergency Kit
		</button>
	</div>
</div>

<!-- Screen-only instructions -->
<div class="screen-only max-w-4xl mx-auto mb-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
	<div class="flex items-start gap-3">
		<AlertTriangle class="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
		<div>
			<h2 class="text-lg font-semibold text-amber-900 mb-2">Important Instructions</h2>
			<ul class="text-amber-800 space-y-1 text-sm">
				<li>• <strong>Fill out by hand</strong> with a reliable pen after printing</li>
				<li>• <strong>Test all information</strong> by logging in before storing</li>
				<li>• <strong>Store securely</strong> with other important documents</li>
				<li>• <strong>Make multiple copies</strong> in different locations</li>
				<li>• <strong>Update immediately</strong> when any information changes</li>
			</ul>
		</div>
	</div>
</div>

<!-- Print-only header -->
<div class="print-only">
	<div class="text-center border-b-2 border-gray-800 pb-4 mb-6">
		<h1 class="text-3xl font-bold text-gray-900 mb-2">BITWARDEN EMERGENCY KIT</h1>
		<p class="text-lg text-gray-700">Password Manager Recovery Information</p>
		<p class="text-sm text-gray-600 mt-2">Created: {currentDate} | Version 1.0</p>
	</div>
</div>

<!-- Main form content -->
<div class="max-w-4xl mx-auto space-y-8 p-6">
	
	<!-- Section 1: Bitwarden Account Information -->
	<section class="border-2 border-gray-300 rounded-lg p-6">
		<h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
			<Shield class="w-5 h-5" />
			1. Bitwarden Account Information
		</h2>
		
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Server URL (circle one):
				</label>
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<div class="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
						<span class="text-sm">https://vault.bitwarden.com (US servers)</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
						<span class="text-sm">https://vault.bitwarden.eu (EU servers)</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
						<span class="text-sm">Self-hosted: ________________________</span>
					</div>
				</div>
			</div>

			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Account Creation Date:
				</label>
				<div class="border-b-2 border-gray-400 h-8 w-full"></div>
			</div>

			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Email Address:
				</label>
				<div class="border-b-2 border-gray-400 h-8 w-full"></div>
				<p class="text-xs text-gray-500 mt-1">The email address you use to log into Bitwarden</p>
			</div>

			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Master Password:
				</label>
				<div class="space-y-2">
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
				</div>
				<p class="text-xs text-gray-500 mt-1">Write clearly in block letters</p>
			</div>

			<div class="form-field md:col-span-2">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					2FA Recovery Code:
				</label>
				<div class="border-b-2 border-gray-400 h-8 w-full"></div>
				<p class="text-xs text-gray-500 mt-1">From Settings → Security → Two-step Login → View Recovery Code</p>
			</div>
		</div>
	</section>

	<!-- Section 2: Email Account Backup -->
	<section class="border-2 border-gray-300 rounded-lg p-6">
		<h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
			<Info class="w-5 h-5" />
			2. Email Account Backup
		</h2>
		
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Email Provider URL:
				</label>
				<div class="border-b-2 border-gray-400 h-8 w-full"></div>
				<p class="text-xs text-gray-500 mt-1">e.g., gmail.com, outlook.com, protonmail.com</p>
			</div>

			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Email Password:
				</label>
				<div class="border-b-2 border-gray-400 h-8 w-full"></div>
			</div>

			<div class="form-field md:col-span-2">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Email 2FA Recovery Codes:
				</label>
				<div class="grid grid-cols-2 gap-4">
					<div class="border-b-2 border-gray-400 h-8"></div>
					<div class="border-b-2 border-gray-400 h-8"></div>
					<div class="border-b-2 border-gray-400 h-8"></div>
					<div class="border-b-2 border-gray-400 h-8"></div>
				</div>
			</div>

			<div class="form-field md:col-span-2">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Alternative Email Addresses:
				</label>
				<div class="space-y-2">
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
				</div>
			</div>
		</div>
	</section>

	<!-- Section 3: Authenticator App Information -->
	<section class="border-2 border-gray-300 rounded-lg p-6">
		<h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
			<CheckCircle class="w-5 h-5" />
			3. Authenticator App Information
		</h2>
		
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Authenticator App (circle one):
				</label>
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<div class="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
						<span class="text-sm">Ente Auth (recommended)</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
						<span class="text-sm">Aegis Authenticator</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
						<span class="text-sm">2FAS</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
						<span class="text-sm">Other: ________________________</span>
					</div>
				</div>
			</div>

			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					App Account Email:
				</label>
				<div class="border-b-2 border-gray-400 h-8 w-full"></div>
			</div>

			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					App Account Password:
				</label>
				<div class="border-b-2 border-gray-400 h-8 w-full"></div>
			</div>

			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Recovery Key/Backup Code:
				</label>
				<div class="border-b-2 border-gray-400 h-8 w-full"></div>
			</div>

			<div class="form-field md:col-span-2">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Export File Location Notes:
				</label>
				<div class="space-y-2">
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
				</div>
				<p class="text-xs text-gray-500 mt-1">Where you've stored backup exports of your authenticator codes</p>
			</div>
		</div>
	</section>

	<!-- Section 4: Device Access Information -->
	<section class="border-2 border-gray-300 rounded-lg p-6">
		<h2 class="text-xl font-bold text-gray-900 mb-4">
			4. Device Access Information
		</h2>
		
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Computer Login Password:
				</label>
				<div class="border-b-2 border-gray-400 h-8 w-full"></div>
			</div>

			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Phone PIN/Password:
				</label>
				<div class="border-b-2 border-gray-400 h-8 w-full"></div>
			</div>

			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Hardware Security Key PIN:
				</label>
				<div class="border-b-2 border-gray-400 h-8 w-full"></div>
			</div>

			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Biometric Backup Method:
				</label>
				<div class="border-b-2 border-gray-400 h-8 w-full"></div>
				<p class="text-xs text-gray-500 mt-1">e.g., "Fingerprint + PIN 1234"</p>
			</div>
		</div>
	</section>

	<!-- Section 5: Emergency Contacts -->
	<section class="border-2 border-gray-300 rounded-lg p-6">
		<h2 class="text-xl font-bold text-gray-900 mb-4">
			5. Emergency Contacts
		</h2>
		
		<div class="space-y-6">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div class="form-field">
					<label class="block text-sm font-semibold text-gray-700 mb-2">
						Trusted Person Name:
					</label>
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
				</div>

				<div class="form-field">
					<label class="block text-sm font-semibold text-gray-700 mb-2">
						Relationship:
					</label>
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
				</div>

				<div class="form-field">
					<label class="block text-sm font-semibold text-gray-700 mb-2">
						Phone Number:
					</label>
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
				</div>

				<div class="form-field">
					<label class="block text-sm font-semibold text-gray-700 mb-2">
						Email Address:
					</label>
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
				</div>
			</div>

			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Executor/Estate Contact:
				</label>
				<div class="border-b-2 border-gray-400 h-8 w-full"></div>
			</div>

			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Instructions for Emergency Access:
				</label>
				<div class="space-y-2">
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
				</div>
			</div>
		</div>
	</section>

	<!-- Section 6: Storage and Maintenance -->
	<section class="border-2 border-gray-300 rounded-lg p-6">
		<h2 class="text-xl font-bold text-gray-900 mb-4">
			6. Storage and Maintenance
		</h2>
		
		<div class="space-y-6">
			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Copy #1 Location:
				</label>
				<div class="border-b-2 border-gray-400 h-8 w-full"></div>
			</div>

			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Copy #2 Location (Offsite):
				</label>
				<div class="border-b-2 border-gray-400 h-8 w-full"></div>
			</div>

			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Access Instructions for Family:
				</label>
				<div class="space-y-2">
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div class="form-field">
					<label class="block text-sm font-semibold text-gray-700 mb-2">
						Last Updated:
					</label>
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
				</div>

				<div class="form-field">
					<label class="block text-sm font-semibold text-gray-700 mb-2">
						Next Review Date:
					</label>
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
				</div>
			</div>

			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Testing Checklist (check when completed):
				</label>
				<div class="space-y-2 text-sm">
					<div class="flex items-center gap-2">
						<div class="w-4 h-4 border-2 border-gray-400"></div>
						<span>Successfully logged into Bitwarden using this information</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-4 h-4 border-2 border-gray-400"></div>
						<span>Successfully accessed email account</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-4 h-4 border-2 border-gray-400"></div>
						<span>Verified 2FA recovery codes work</span>
					</div>
					<div class="flex items-center gap-2">
						<div class="w-4 h-4 border-2 border-gray-400"></div>
						<span>Family member can locate and read this sheet</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Section 7: Notes -->
	<section class="border-2 border-gray-300 rounded-lg p-6">
		<h2 class="text-xl font-bold text-gray-900 mb-4">
			7. Additional Notes
		</h2>
		
		<div class="space-y-4">
			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Special Instructions:
				</label>
				<div class="space-y-2">
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
				</div>
			</div>

			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Custom Recovery Procedures:
				</label>
				<div class="space-y-2">
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
				</div>
			</div>

			<div class="form-field">
				<label class="block text-sm font-semibold text-gray-700 mb-2">
					Important Account Information:
				</label>
				<div class="space-y-2">
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
					<div class="border-b-2 border-gray-400 h-8 w-full"></div>
				</div>
			</div>
		</div>
	</section>
</div>

<!-- Print-only footer -->
<div class="print-only mt-8 pt-4 border-t-2 border-gray-300 text-center text-sm text-gray-600">
	<p><strong>IMPORTANT:</strong> Store this document securely. Make multiple copies in different locations.</p>
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
		h1, h2, h3 {
			color: #000 !important;
		}
		
		.text-gray-700, .text-gray-900 {
			color: #000 !important;
		}
		
		.text-gray-500, .text-gray-600 {
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
