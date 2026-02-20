import { split, combine } from 'shamirs-secret-sharing';

/**
 * Splits a secret into N shares where any K shares can recover the original
 * @param secret - The secret string to split
 * @param totalShares - Total number of shares to generate (N)
 * @param threshold - Minimum number of shares needed to recover (K)
 * @returns Promise resolving to array of base64-encoded share strings
 */
export async function splitSecret(
	secret: string,
	totalShares: number,
	threshold: number
): Promise<string[]> {
	const encoder = new TextEncoder();
	const secretBytes = encoder.encode(secret);

	// Split returns an array of Uint8Array shares
	const shareBytes = split(secretBytes, { shares: totalShares, threshold });

	// Convert Uint8Array shares to base64 strings for easy storage/transmission
	return shareBytes.map((share: Uint8Array) => {
		try {
			return btoa(String.fromCharCode(...share));
		} catch {
			throw new Error('Share data too large to encode');
		}
	});
}

/**
 * Combines K or more shares to recover the original secret
 * @param shares - Array of base64-encoded share strings (must have at least K shares)
 * @returns Promise resolving to the recovered secret string
 * @throws Error if reconstruction fails (insufficient or invalid shares)
 */
export async function combineShares(shares: string[]): Promise<string> {
	// Convert base64 strings back to Uint8Array
	const shareBytes = shares.map((share) => {
		try {
			return Uint8Array.from(atob(share), (c) => c.charCodeAt(0));
		} catch {
			throw new Error('Failed to decode share data');
		}
	});

	// Combine shares to recover the secret
	const secretBytes = combine(shareBytes);

	// Convert bytes back to string
	const decoder = new TextDecoder();
	return decoder.decode(secretBytes);
}
