export const validateLogin = (login: string): string | null => {
	if (!login) {
		return 'Login is required';
	}

	if (login.length < 5) {
		return 'Login must be longer than 4 characters';
	}

	if (login.includes('@')) {
		const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

		if (!emailPattern.test(login)) {
			return 'Enter a valid email address';
		}
	} else {
		const stringPattern = /^[A-Za-z0-9]+$/;

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

	const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
	if (!passwordPattern.test(password)) {
		return 'Password must contain letters, numbers, and special characters';
	}

	return null;
};

export const validatePhone = (phone: string): string | null => {
	if (!phone) {
		return 'Phone number is required';
	}

	const phonePattern = /^[0-9]+$/;
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

	const codePattern = /^[0-9]+$/;
	if (!codePattern.test(code)) {
		return 'Enter 6-digit code';
	}

	return null;
};
