import {
	emailPattern,
	stringPattern,
	usernamePattern,
	passwordPattern,
	phonePattern,
	codePattern,
	cardNumberPattern,
	expirationDatePattern,
	CVCCodePattern,
} from '@/utils/regexpUtils';

export type ValidatorFunction = (value: string) => string | null;

export const validateEmail: ValidatorFunction = (email) => {
	if (!email) return 'Email is required';
	if (!emailPattern.test(email)) return 'Enter a valid email address';

	return null;
};

export const validateUsername: ValidatorFunction = (username) => {
	if (!username) return 'Username is required';
	if (username.length < 5 || username.length > 24) return 'Username must be between 5 and 24 characters';
	if (!usernamePattern.test(username)) return 'Username must contain only letters and numbers';

	return null;
};

export const validateLogin: ValidatorFunction = (login) => {
	if (!login) return 'Login is required';
	if (login.length < 5) return 'Login must be longer than 4 characters';

	if (login.includes('@')) {
		return validateEmail(login);
	} else {
		if (!stringPattern.test(login)) {
			return 'Login must contain only letters and numbers';
		}
	}

	return null;
};

export const validatePassword: ValidatorFunction = (password) => {
	if (!password) return 'Password is required';

	if (password.length < 8 || password.length > 20) {
		return 'Password must be between 8 and 20 characters';
	}

	if (!passwordPattern.test(password)) {
		return 'Password must contain letters, numbers, and special characters';
	}

	return null;
};

export const validatePhone: ValidatorFunction = (phone) => {
	if (!phone) return 'Phone number is required';
	if (!phonePattern.test(phone)) return 'Enter a valid phone number';

	return null;
};

export const validateCode: ValidatorFunction = (code) => {
	if (!code) return 'Code number is required';
	if (code.length !== 6) return 'Enter 6-digit code';
	if (!codePattern.test(code)) return 'Enter 6-digit code';

	return null;
};

export const validateCardNumber: ValidatorFunction = (cardNumber) => {
	if (!cardNumber) return 'Card number is required';
	if (cardNumber.length !== 19) return 'Card number is incomplete';

	if (!cardNumberPattern.test(cardNumber.replace(/\s+/g, ''))) {
		return 'Enter a valid card number';
	}

	return null;
};

export const validateExpirationDate: ValidatorFunction = (expirationDate) => {
	if (!expirationDate) {
		return 'Expiration date is required';
	}

	if (expirationDate.length !== 5) {
		return 'Expiration date is incomplete';
	}

	if (!expirationDatePattern.test(expirationDate)) {
		return 'Enter a valid expiration date';
	}

	const [month, year] = expirationDate.split('/').map((part) => parseInt(part));

	const today = new Date();
	const currentMonth = today.getMonth() + 1;
	const currentYear = today.getFullYear() % 100;

	if (year < currentYear || (year === currentYear && month < currentMonth)) {
		return 'Expiration date has passed';
	}

	return null;
};

export const validateCvcCode: ValidatorFunction = (cvcCode) => {
	if (!cvcCode) {
		return 'CVC code is required';
	}

	if (cvcCode.length < 3 || cvcCode.length > 4) {
		return 'CVC code is incomplete';
	}

	if (!CVCCodePattern.test(cvcCode)) {
		return 'Enter a valid CVC code';
	}

	return null;
};

export const validateName: ValidatorFunction = (name) => {
	if (!name) return 'Name is required';
	if (name.length > 30) return 'Maximum 30 characters';

	return null;
};

export const validateBio: ValidatorFunction = (bio) => {
	if (bio.length > 80) {
		return 'Maximum 80 characters';
	}

	return null;
};
