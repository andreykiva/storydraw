/**
 * Generates a random number with a length between the specified minimum and maximum.
 *
 * @param minLength - The minimum length of the generated number.
 * @param maxLength - The maximum length of the generated number.
 * @returns A string representing the randomly generated number.
 *
 * @throws Error if minLength is greater than maxLength.
 */
export const generateRandomNumber = (minLength: number, maxLength: number): string => {
	// Validate the input parameters
	if (minLength > maxLength) {
		throw new Error('minLength cannot be greater than maxLength');
	}

	const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
	let randomNumber = '';

	for (let i = 0; i < length; i++) {
		randomNumber += Math.floor(Math.random() * 10);
	}

	return randomNumber;
};
