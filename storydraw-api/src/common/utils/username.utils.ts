import { generateRandomNumber } from './number.utils';

export const generateUsername = (): string => {
	return 'user' + generateRandomNumber(12, 18);
};
