import type { SecretBundle } from '$lib/types/share';

export const LIMITS = {
	MAX_INPUT_LENGTH: 10000, // 10KB
	MAX_SHARE_LENGTH: 50000, // 50KB
	MIN_THRESHOLD: 2,
	MAX_TOTAL_SHARES: 10
} as const;

export function validateInputLength(input: string): { valid: boolean; error?: string } {
	if (input.length === 0) {
		return { valid: false, error: 'Input cannot be empty' };
	}
	if (input.trim().length === 0) {
		return { valid: false, error: 'Input cannot be only whitespace' };
	}
	if (input.length > LIMITS.MAX_INPUT_LENGTH) {
		return {
			valid: false,
			error: `Input exceeds ${LIMITS.MAX_INPUT_LENGTH} character limit`
		};
	}
	return { valid: true };
}

/**
 * Validates that a string is valid base64
 * @param share - The share string to validate
 * @returns true if valid base64, false otherwise
 */
export function validateShareFormat(share: string): boolean {
	// Check if valid base64
	try {
		atob(share);
		return true;
	} catch {
		return false;
	}
}

export function enhancedValidateShareFormat(share: string): { valid: boolean; error?: string } {
	// Check length bounds
	if (share.length > LIMITS.MAX_SHARE_LENGTH) {
		return { valid: false, error: 'Share data too large' };
	}

	// Validate base64 format with regex
	if (!/^[A-Za-z0-9+/]*={0,2}$/.test(share)) {
		return { valid: false, error: 'Invalid share format' };
	}

	// Try decoding
	try {
		const decoded = atob(share);
		if (decoded.length === 0) {
			return { valid: false, error: 'Share data is empty' };
		}
	} catch {
		return { valid: false, error: 'Share data is corrupted' };
	}

	return { valid: true };
}

/**
 * Checks for duplicate shares in an array
 * @param shares - Array of share strings to check
 * @returns Validation result indicating if duplicates were found
 */
export function checkDuplicateShares(shares: string[]): {
	valid: boolean;
	error?: string;
} {
	const uniqueShares = new Set(shares);
	if (uniqueShares.size !== shares.length) {
		return {
			valid: false,
			error: 'Duplicate shares detected. Each share should be unique.'
		};
	}
	return { valid: true };
}

/**
 * Validates that share count meets minimum requirements
 * @param shareCount - Number of shares to validate
 * @param minimumRequired - Minimum number of shares required (default: 2)
 * @returns Validation result indicating if count is sufficient
 */
export function validateShareCount(
	shareCount: number,
	minimumRequired: number = 2
): { valid: boolean; error?: string } {
	if (shareCount < minimumRequired) {
		return {
			valid: false,
			error: `At least ${minimumRequired} shares required. You have ${shareCount}.`
		};
	}
	return { valid: true };
}

/**
 * Validates email address format
 * @param email - Email address to validate
 * @returns Validation result with success flag and optional error message
 */
export function validateEmail(email: string): {
	valid: boolean;
	error?: string;
} {
	if (!email || email.trim().length === 0) {
		return { valid: false, error: 'Email address is required' };
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!emailRegex.test(email.trim())) {
		return {
			valid: false,
			error: 'Please enter a valid email address (e.g., user@example.com)'
		};
	}

	if (email.length > 254) {
		return {
			valid: false,
			error: 'Email address is too long (max 254 characters)'
		};
	}

	return { valid: true };
}

/**
 * Validates a set of shares before attempting reconstruction
 * @param shares - Array of share strings to validate
 * @returns Validation result with success flag and optional error message
 */
export function validateShareSet(shares: string[]): {
	valid: boolean;
	error?: string;
} {
	// Check minimum count
	const countValidation = validateShareCount(shares.length, 2);
	if (!countValidation.valid) return countValidation;

	// Check for duplicates
	const duplicateCheck = checkDuplicateShares(shares);
	if (!duplicateCheck.valid) return duplicateCheck;

	// Validate each share format using ENHANCED validation
	for (let i = 0; i < shares.length; i++) {
		const validation = enhancedValidateShareFormat(shares[i]);
		if (!validation.valid) {
			return {
				valid: false,
				error: `Share ${i + 1}: ${validation.error}`
			};
		}
	}

	// Check length consistency
	const firstLength = shares[0].length;
	if (!shares.every((s) => s.length === firstLength)) {
		return {
			valid: false,
			error: 'Shares have different lengths. They may be from different secret sharing sessions.'
		};
	}

	return { valid: true };
}

/**
 * Validates that an object conforms to the SecretBundle schema
 * @param obj - Object to validate
 * @returns Type predicate indicating if object is a valid SecretBundle
 */
export function isValidSecretBundle(obj: unknown): obj is SecretBundle {
	if (!obj || typeof obj !== 'object') return false;

	const bundle = obj as Record<string, unknown>;

	const hasSecrets =
		typeof bundle.masterPassword === 'string' ||
		typeof bundle.email === 'string' ||
		typeof bundle.authenticatorEmail === 'string';

	if (!hasSecrets) return false;

	// Validate types of present fields
	if (bundle.masterPassword !== undefined && typeof bundle.masterPassword !== 'string')
		return false;
	if (bundle.email !== undefined && typeof bundle.email !== 'string') return false;
	if (bundle.emailPassword !== undefined && typeof bundle.emailPassword !== 'string') return false;
	if (bundle.authenticatorEmail !== undefined && typeof bundle.authenticatorEmail !== 'string')
		return false;
	if (
		bundle.authenticatorPassword !== undefined &&
		typeof bundle.authenticatorPassword !== 'string'
	)
		return false;
	if (
		bundle.authenticatorRecoveryKey !== undefined &&
		typeof bundle.authenticatorRecoveryKey !== 'string'
	)
		return false;

	return true;
}

/**
 * Sanitizes error messages to prevent XSS attacks
 * @param message - Error message to sanitize
 * @returns Sanitized error message safe for display
 */
export function sanitizeErrorMessage(message: string): string {
	if (!message) return '';

	const withoutTags = message.replace(/<[^>]*>/g, '');

	const encoded = withoutTags
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');

	return encoded.substring(0, 500);
}
