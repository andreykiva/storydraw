export const generateRandomNumber = (minLength: number, maxLength: number): string => {
	const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
	let randomNumber = '';

	for (let i = 0; i < length; i++) {
		randomNumber += Math.floor(Math.random() * 10);
	}

	return randomNumber;
};
