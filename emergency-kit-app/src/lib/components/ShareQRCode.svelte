<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { createQRCode } from '$lib/utils/qrcode';
	import type QRCodeStyling from 'qr-code-styling';

	let { data, size = 300 }: { data: string; size?: number } = $props();
	let container: HTMLDivElement;
	let qrInstance: QRCodeStyling | null = null;

	onMount(() => {
		qrInstance = createQRCode({
			data,
			size,
			errorCorrectionLevel: 'H'
		});
		qrInstance.append(container);
	});

	onDestroy(() => {
		if (container) {
			// eslint-disable-next-line svelte/no-dom-manipulating
			container.innerHTML = '';
		}
		qrInstance = null;
	});
</script>

<div bind:this={container} class="qr-container flex items-center justify-center"></div>
