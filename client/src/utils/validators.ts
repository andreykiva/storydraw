import { emailPattern, stringPattern, passwordPattern, phonePattern, codePattern } from './regexpUtils';

export const validateEmail = (email: string): string | null => {
	if (!email) {
		return 'Email is required';
	}

	if (!emailPattern.test(email)) {
		return 'Enter a valid email address';
	}
};

export const validateLogin = (login: string): string | null => {
	if (!login) {
		return 'Login is required';
	}

	if (login.length < 5) {
		return 'Login must be longer than 4 characters';
	}

	if (login.includes('@')) {
		validateEmail(login);
	} else {
		if (!stringPattern.test(login)) {
			return 'Login must contain only letters and numbers';
		}
	}
	return null;
};

export const validatePassword = (password: string): string | null => {
	if (!password) {
		return 'Password is required';
	}

	if (password.length < 8 || password.length > 20) {
		return 'Password must be between 8 and 20 characters';
	}

	if (!passwordPattern.test(password)) {
		return 'Password must contain letters, numbers, and special characters';
	}

	return null;
};

export const validatePhone = (phone: string): string | null => {
	if (!phone) {
		return 'Phone number is required';
	}

	if (!phonePattern.test(phone)) {
		return 'Enter a valid phone number';
	}

	return null;
};

export const validateCode = (code: string): string | null => {
	if (!code) {
		return 'Code number is required';
	}

	if (code.length !== 6) {
		return 'Enter 6-digit code';
	}

	if (!codePattern.test(code)) {
		return 'Enter 6-digit code';
	}

	return null;
};
