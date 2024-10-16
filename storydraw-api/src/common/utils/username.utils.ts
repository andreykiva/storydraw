import { generateRandomNumber } from './number.utils';

/**
 * Generates a unique username by appending a random number to the prefix 'user'.
 *
 * The random number length is between 12 and 18 digits, inclusive.
 *
 * @returns A string representing the generated username.
 */
export const generateUsername = (): string => {
	return 'user' + generateRandomNumber(12, 18);
};
