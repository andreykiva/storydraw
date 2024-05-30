import { useState, useCallback } from 'react';
import { validatePayment } from '@/utils/validators/paymentValidators';
import { PAYMENT_FIELD } from '@/constants/subscription';
import { formatCardNumber, formatExpirationDate, formatCVCCode } from '@/utils/formatUtils';
import countries from '@/data/countries';
import type Country from '@/types/Country';
import { validateCardNumber, validateCvcCode, validateExpirationDate } from '@/utils/validators/commonValidators';

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

	const [country, setCountry] = useState(countries[0]);

	const isCardNumberInvalid = validateCardNumber(formData[PAYMENT_FIELD.CARD_NUMBER]);
	const isExpirationDateInvalid = validateExpirationDate(formData[PAYMENT_FIELD.EXPIRATION_DATE]);
	const isCVCCodeInvalid = validateCvcCode(formData[PAYMENT_FIELD.CVC_CODE]);

	const isFormBtnDisabled = Boolean(isCardNumberInvalid || isExpirationDateInvalid || isCVCCodeInvalid);

	const handleChangeCardNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		setFormData({
			...formData,
			[PAYMENT_FIELD.CARD_NUMBER]: formatCardNumber(value),
		});
	};

	const handleChangeExpirationDate = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		setFormData({
			...formData,
			[PAYMENT_FIELD.EXPIRATION_DATE]: formatExpirationDate(value),
		});
	};

	const handleChangeCVCCode = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		setFormData({
			...formData,
			[PAYMENT_FIELD.CVC_CODE]: formatCVCCode(value),
		});
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

	const handleChangeCountry = (selectedCountry: Country) => {
		setCountry(selectedCountry);
	};

	const resetForm = useCallback(() => {
		setFormData({
			[PAYMENT_FIELD.CARD_NUMBER]: '',
			[PAYMENT_FIELD.EXPIRATION_DATE]: '',
			[PAYMENT_FIELD.CVC_CODE]: '',
		});

		setFormErrors({
			[PAYMENT_FIELD.CARD_NUMBER]: '',
			[PAYMENT_FIELD.EXPIRATION_DATE]: '',
			[PAYMENT_FIELD.CVC_CODE]: '',
		});

		setCountry(countries[0]);
	}, [setFormData, setFormErrors, setCountry]);

	return {
		formData,
		formErrors,
		country,
		isFormBtnDisabled,
		handleChangeCardNumber,
		handleChangeExpirationDate,
		handleChangeCVCCode,
		handleChangeCountry,
		handleFocusInput,
		handleBlurInput,
		resetForm,
	};
};

export default usePaymentForm;
