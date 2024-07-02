import { useState } from 'react';
import { validateResetPasswordForm } from '@/utils/validators/authValidators';
import { RESET_PASSWORD_FIELD } from '@/constants/auth';
import countries from '@/data/countries';
import type Country from '@/types/Country';
import { validatePhone, validatePassword, validateCode, validateEmail } from '@/utils/validators/commonValidators';

type FormData = Record<RESET_PASSWORD_FIELD, string>;
type FormErrors = Record<RESET_PASSWORD_FIELD, string>;

const useResetPasswordForm = () => {
	const [formData, setFormData] = useState<FormData>({
		[RESET_PASSWORD_FIELD.EMAIL]: '',
		[RESET_PASSWORD_FIELD.PASSWORD]: '',
		[RESET_PASSWORD_FIELD.PHONE]: '',
		[RESET_PASSWORD_FIELD.CODE]: '',
	});

	const [formErrors, setFormErrors] = useState<FormErrors>({
		[RESET_PASSWORD_FIELD.EMAIL]: '',
		[RESET_PASSWORD_FIELD.PASSWORD]: '',
		[RESET_PASSWORD_FIELD.PHONE]: '',
		[RESET_PASSWORD_FIELD.CODE]: '',
	});

	const [country, setCountry] = useState(countries[0]);
	const [isPhoneMode, setIsPhoneMode] = useState(false);

	const isPasswordInvalid = validatePassword(formData[RESET_PASSWORD_FIELD.PASSWORD]);
	const isCodeInvalid = validateCode(formData[RESET_PASSWORD_FIELD.CODE]);
	const isPhoneInvalid = validatePhone(formData[RESET_PASSWORD_FIELD.PHONE]);
	const isEmailInvalid = validateEmail(formData[RESET_PASSWORD_FIELD.EMAIL]);

	const isFormBtnDisabled = Boolean(isPasswordInvalid || isCodeInvalid || isPhoneInvalid || isEmailInvalid);
	const isCodeBtnDisabled = Boolean(isPhoneInvalid || isEmailInvalid);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleBlurInput = (fieldName: RESET_PASSWORD_FIELD) => {
		if (formData[fieldName]) {
			const fieldError = validateResetPasswordForm(fieldName, formData[fieldName]);

			setFormErrors({
				...formErrors,
				[fieldName]: fieldError || '',
			});
		} else {
			setFormErrors({
				...formErrors,
				[fieldName]: '',
			});
		}
	};

	const handleChangeCountry = (selectedCountry: Country) => {
		setCountry(selectedCountry);
	};

	return {
		formData,
		formErrors,
		country,
		isPhoneMode,
		isFormBtnDisabled,
		isCodeBtnDisabled,
		handleChangeInput,
		handleBlurInput,
		handleChangeCountry,
		handleChangeIsPhoneMode: setIsPhoneMode,
	};
};

export default useResetPasswordForm;
