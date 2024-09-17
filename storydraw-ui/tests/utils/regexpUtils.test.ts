import { escapeRegExp } from '@/utils/regexpUtils';

describe('escapeRegExp', () => {
	it('should escape special characters', () => {
		const input = '[.*+?^${}()|\\/]';
		const expectedOutput = '\\[\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\\\/\\]';
		expect(escapeRegExp(input)).toBe(expectedOutput);
	});

	it('should not modify alphanumeric characters', () => {
		const input = 'abc123';
		expect(escapeRegExp(input)).toBe(input);
	});

	it('should handle an empty string', () => {
		const input = '';
		expect(escapeRegExp(input)).toBe('');
	});

	it('should handle strings with only special characters', () => {
		const input = '.*+?^${}()|[]\\';
		const expectedOutput = '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\';
		expect(escapeRegExp(input)).toBe(expectedOutput);
	});

	it('should handle a string with mixed content', () => {
		const input = 'Hello (world)! $5.00';
		const expectedOutput = 'Hello \\(world\\)! \\$5\\.00';
		expect(escapeRegExp(input)).toBe(expectedOutput);
	});
});
