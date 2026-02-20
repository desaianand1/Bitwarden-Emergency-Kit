/**
 * Generates a non-sequential random ID for share identification
 * Uses crypto.getRandomValues() for cryptographically secure randomness
 * @returns A 12-character hexadecimal ID (e.g., "A3F2E9C2D1B7")
 */
export function generateShareId(): string {
	const array = new Uint8Array(6);
	crypto.getRandomValues(array);
	return Array.from(array, (byte) => byte.toString(16).padStart(2, '0').toUpperCase()).join('');
}

/**
 * Generates a shorter display ID (first 6 characters)
 * @param fullId - The full 12-character ID
 * @returns First 6 characters of the ID (e.g., "A3F2E9")
 */
export function getDisplayId(fullId: string): string {
	return fullId.substring(0, 6);
}
