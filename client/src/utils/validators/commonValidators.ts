import {
	emailPattern,
	stringPattern,
	passwordPattern,
	phonePattern,
	codePattern,
	cardNumberPattern,
} from '../regexpUtils';

export type ValidatorFunction = (value: string) => string | null;

export const validateEmail: ValidatorFunction = (email) => {
	if (!email) return 'Email is required';
	if (!emailPattern.test(email)) return 'Enter a valid email address';

	return null;
};

export const validateUsername: ValidatorFunction = (username) => {
	if (!username) return 'Username is required';
	if (username.length < 5) return 'Username must be longer than 4 characters';
	if (!stringPattern.test(username)) return 'Username must contain only letters and numbers';

	return null;
};

export const validateLogin: ValidatorFunction = (login) => {
	if (!login) return 'Login is required';
	if (login.length < 5) return 'Login must be longer than 4 characters';

	if (login.includes('@')) {
		validateEmail(login);
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
	if (cardNumber.length !== 19) return 'The card number is incomplete';

	if (!cardNumberPattern.test(cardNumber.replace(/\s+/g, ''))) {
		return 'The card number is invalid';
	}

	return null;
};

//test
export const validateExpirationDate: ValidatorFunction = (expirationDate) => {
	if (!expirationDate) {
		return 'Validity is required';
	}

	if (expirationDate.length !== 19) {
		return 'Validity is incomplete';
	}

	if (!cardNumberPattern.test(expirationDate.replace(/\s+/g, ''))) {
		return 'The card number is invalid';
	}

	return null;
};

//test
export const validateCvcCode: ValidatorFunction = (cvcCode) => {
	if (!cvcCode) {
		return 'Validity is required';
	}

	if (cvcCode.length !== 4) {
		return 'Validity is incomplete';
	}

	if (!cardNumberPattern.test(cvcCode.replace(/\s+/g, ''))) {
		return 'The card number is invalid';
	}

	return null;
};
