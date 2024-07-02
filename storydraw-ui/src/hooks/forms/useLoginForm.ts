import { useState } from 'react';
import { validateLoginForm } from '@/utils/validators/authValidators';
import { LOGIN_FIELD, LOGIN_METHOD } from '@/constants/auth';
import countries from '@/data/countries';
import type Country from '@/types/Country';
import { validatePhone, validatePassword, validateCode, validateLogin } from '@/utils/validators/commonValidators';

type FormData = Record<LOGIN_FIELD, string>;
type FormErrors = Record<LOGIN_FIELD, string>;

const useLoginForm = () => {
	const [formData, setFormData] = useState<FormData>({
		[LOGIN_FIELD.LOGIN]: '',
		[LOGIN_FIELD.PASSWORD]: '',
		[LOGIN_FIELD.PHONE]: '',
		[LOGIN_FIELD.CODE]: '',
	});

	const [formErrors, setFormErrors] = useState<FormErrors>({
		[LOGIN_FIELD.LOGIN]: '',
		[LOGIN_FIELD.PASSWORD]: '',
		[LOGIN_FIELD.PHONE]: '',
		[LOGIN_FIELD.CODE]: '',
	});

	const [country, setCountry] = useState(countries[0]);
	const [loginMethod, setLoginMethod] = useState<LOGIN_METHOD>(LOGIN_METHOD.PHONE_AND_CODE);

	const isLoginInvalid = validateLogin(formData[LOGIN_FIELD.LOGIN]);
	const isCodeInvalid = validateCode(formData[LOGIN_FIELD.CODE]);
	const isPhoneInvalid = validatePhone(formData[LOGIN_FIELD.PHONE]);
	const isPasswordInvalid = validatePassword(formData[LOGIN_FIELD.PASSWORD]);

	const validationResults = {
		loginAndPassword: isLoginInvalid || isPasswordInvalid,
		phoneAndCode: isPhoneInvalid || isCodeInvalid,
		phoneAndPassword: isPhoneInvalid || isPasswordInvalid,
	};

	const isFormBtnDisabled = Boolean(validationResults[loginMethod]);
	const isCodeBtnDisabled = Boolean(isPhoneInvalid);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleBlurInput = (fieldName: LOGIN_FIELD) => {
		if (formData[fieldName]) {
			const fieldError = validateLoginForm(fieldName, formData[fieldName]);

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

	const handleChangeLoginMethod = (newLoginMethod: LOGIN_METHOD) => {
		setLoginMethod(newLoginMethod);
	};

	return {
		formData,
		formErrors,
		country,
		loginMethod,
		isFormBtnDisabled,
		isCodeBtnDisabled,
		handleChangeInput,
		handleBlurInput,
		handleChangeCountry,
		handleChangeLoginMethod,
	};
};

export default useLoginForm;
