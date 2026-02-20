import { goto } from '$app/navigation';
import type { Share } from '$lib/types/share';

// In-memory only, no persistence to sessionStorage or localStorage
let currentShares: Share[] = $state([]);

export function setShares(shares: Share[]) {
	currentShares = shares;
}

export function getShares(): Share[] {
	return currentShares;
}

export function clearShares() {
	currentShares = [];
}

export async function navigateToShares(shares: Share[]) {
	setShares(shares);
	await goto('/secret-sharing/shares');
}
