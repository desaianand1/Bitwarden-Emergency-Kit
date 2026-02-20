/**
 * Colorizes text based on character type for better readability
 * - Numbers: Blue
 * - Special characters/symbols: Red (bold)
 * - Regular characters: Default
 * - Whitespace: Preserved
 *
 * @param text - The text to colorize
 * @returns HTML string with colored spans
 */
export function colorizeText(text: string): string {
	if (!text) return '';

	return text
		.split('')
		.map((char) => {
			// Whitespace - default
			if (char === ' ') {
				return char;
			}
			// Numbers - blue
			if (/[0-9]/.test(char)) {
				return `<span class="text-blue-600 dark:text-blue-400">${char}</span>`;
			}
			// Symbols/Special characters - red
			else if (/[^a-zA-Z0-9]/.test(char)) {
				return `<span class="text-red-600 dark:text-red-400 font-semibold">${char}</span>`;
			}
			// Regular characters - default
			else {
				return char;
			}
		})
		.join('');
}
