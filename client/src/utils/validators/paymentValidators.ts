import { PAYMENT_FIELD } from '@/constants/subscription';
import type { ValidatorFunction } from './commonValidators';
import { validateCardNumber, validateExpirationDate, validateCvcCode } from './commonValidators';

type PaymentValidators = Record<PAYMENT_FIELD, ValidatorFunction>;

const paymentValidators: PaymentValidators = {
	[PAYMENT_FIELD.CARD_NUMBER]: validateCardNumber,
	[PAYMENT_FIELD.EXPIRATION_DATE]: validateExpirationDate,
	[PAYMENT_FIELD.CVC_CODE]: validateCvcCode,
};

export const validatePayment = (key: PAYMENT_FIELD, value: string): string | null => {
	const validator = paymentValidators[key];

	if (validator) {
		return validator(value);
	}

	throw new Error('Invalid validation key');
};
