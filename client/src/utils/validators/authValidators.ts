import { LOGIN_FIELD, REGISTER_FIELD, RESET_PASSWORD_FIELD } from '@/constants/auth';
import type { ValidatorFunction } from './commonValidators';
import {
	validateLogin,
	validatePassword,
	validatePhone,
	validateCode,
	validateEmail,
	validateUsername,
} from './commonValidators';

type LoginValidators = Record<LOGIN_FIELD, ValidatorFunction>;
type RegisterValidators = Record<REGISTER_FIELD, ValidatorFunction>;
type ResetPasswordValidators = Record<RESET_PASSWORD_FIELD, ValidatorFunction>;

const loginValidators: LoginValidators = {
	[LOGIN_FIELD.LOGIN]: validateLogin,
	[LOGIN_FIELD.PASSWORD]: validatePassword,
	[LOGIN_FIELD.PHONE]: validatePhone,
	[LOGIN_FIELD.CODE]: validateCode,
};

const registerValidators: RegisterValidators = {
	[REGISTER_FIELD.EMAIL]: validateEmail,
	[REGISTER_FIELD.USERNAME]: validateUsername,
	[REGISTER_FIELD.PASSWORD]: validatePassword,
	[REGISTER_FIELD.PHONE]: validatePhone,
	[REGISTER_FIELD.CODE]: validateCode,
};

const resetPasswordValidators: ResetPasswordValidators = {
	[RESET_PASSWORD_FIELD.EMAIL]: validateEmail,
	[RESET_PASSWORD_FIELD.PASSWORD]: validatePassword,
	[RESET_PASSWORD_FIELD.PHONE]: validatePhone,
	[RESET_PASSWORD_FIELD.CODE]: validateCode,
};

export const validateLoginForm = (key: LOGIN_FIELD, value: string): string | null => {
	const validator = loginValidators[key];

	if (validator) {
		return validator(value);
	}

	throw new Error('Invalid validation key');
};

export const validateRegisterForm = (key: REGISTER_FIELD, value: string): string | null => {
	const validator = registerValidators[key];

	if (validator) {
		return validator(value);
	}

	throw new Error('Invalid validation key');
};

export const validateResetPasswordForm = (key: RESET_PASSWORD_FIELD, value: string): string | null => {
	const validator = resetPasswordValidators[key];

	if (validator) {
		return validator(value);
	}

	throw new Error('Invalid validation key');
};
