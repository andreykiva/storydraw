import { useState } from 'react';
import { validatePayment } from '@/utils/validators/paymentValidators';
import { PAYMENT_FIELD } from '@/constants/subscription';
import { formatCardNumber } from '@/utils/regexpUtils';

type FormData = Record<PAYMENT_FIELD, string>;
type FormErrors = Record<PAYMENT_FIELD, string>;

const usePaymentForm = () => {
	const [formData, setFormData] = useState<FormData>({
		[PAYMENT_FIELD.CARD_NUMBER]: '',
		[PAYMENT_FIELD.EXPIRATION_DATE]: '',
		[PAYMENT_FIELD.CVC_CODE]: '',
	});

	const [formErrors, setFormErrors] = useState<FormErrors>({
		[PAYMENT_FIELD.CARD_NUMBER]: '',
		[PAYMENT_FIELD.EXPIRATION_DATE]: '',
		[PAYMENT_FIELD.CVC_CODE]: '',
	});

	const handleChangeCardNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const numericValue = value.replace(/[^\d]/g, '');

		setFormData({
			...formData,
			[PAYMENT_FIELD.CARD_NUMBER]: formatCardNumber(numericValue),
		});
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

		if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
			event.preventDefault();
		}
	};

	const handleFocusInput = (fieldName: PAYMENT_FIELD) => {
		setFormErrors({
			...formErrors,
			[fieldName]: '',
		});
	};

	const handleBlurInput = (fieldName: PAYMENT_FIELD) => {
		if (formData[fieldName]) {
			const fieldError = validatePayment(fieldName, formData[fieldName]);

			setFormErrors({
				...formErrors,
				[fieldName]: fieldError || '',
			});
		}
	};

	return {
		formData,
		formErrors,
		handleChangeCardNumber,
		handleKeyDown,
		handleFocusInput,
		handleBlurInput,
	};
};

export default usePaymentForm;
