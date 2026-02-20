/**
 * Represents a secret to be shared using Shamir's Secret Sharing
 */
export interface Secret {
	id: string;
	type: 'master-password' | 'email' | 'authenticator';
	label: string;
	value: string;
	metadata?: Record<string, string>;
}

/**
 * Configuration for generating secret shares
 */
export interface ShareConfiguration {
	totalShares: number;
	threshold: number;
	secrets: Secret[];
	created: string;
}

/**
 * Represents a single share from a secret sharing scheme
 */
export interface Share {
	id: string; // Non-sequential random ID (12 chars)
	shareNumber: number; // 1-based index for display (e.g., "Share 2 of 5")
	totalShares: number; // Total number of shares (N)
	threshold: number; // Minimum shares needed to recover (K)
	data: string; // Base64 encoded share data
	created: string; // ISO timestamp of when shares were created
}

/**
 * Bundle of secrets to be shared together
 */
export interface SecretBundle {
	masterPassword?: string;
	email?: string;
	emailPassword?: string;
	authenticatorEmail?: string;
	authenticatorPassword?: string;
	authenticatorRecoveryKey?: string;
}
