import QRCodeStyling, { type Options as QRCodeOptions } from 'qr-code-styling';

/**
 * QR code generation options
 */
export interface QRGenerationOptions {
	data: string;
	size?: number;
	errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
}

/**
 * Creates a QR code optimized for printing
 * High error correction (H) for reliability
 * Black/white colors for print clarity
 * @param options - QR code generation options
 * @returns QRCodeStyling instance
 */
export function createQRCode(options: QRGenerationOptions): QRCodeStyling {
	const { data, size = 300, errorCorrectionLevel = 'H' } = options;

	const qrOptions: QRCodeOptions = {
		width: size,
		height: size,
		type: 'svg',
		data,
		margin: 10,
		qrOptions: {
			typeNumber: 0,
			mode: 'Byte',
			errorCorrectionLevel
		},
		dotsOptions: {
			color: '#000000',
			type: 'square'
		},
		backgroundOptions: {
			color: '#ffffff'
		},
		cornersSquareOptions: {
			color: '#000000',
			type: 'square'
		},
		cornersDotOptions: {
			color: '#000000',
			type: 'square'
		}
	};

	return new QRCodeStyling(qrOptions);
}
