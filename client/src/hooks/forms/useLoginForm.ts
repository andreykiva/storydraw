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

	const validationMethods = {
		loginAndPassword: () =>
			validateLogin(formData[LOGIN_FIELD.LOGIN]) || validatePassword(formData[LOGIN_FIELD.PASSWORD]),
		phoneAndCode: () => validatePhone(formData[LOGIN_FIELD.PHONE]) || validateCode(formData[LOGIN_FIELD.CODE]),
		phoneAndPassword: () =>
			validatePhone(formData[LOGIN_FIELD.PHONE]) || validatePassword(formData[LOGIN_FIELD.PASSWORD]),
	};

	const isFormBtnDisabled = Boolean(validationMethods[loginMethod]());
	const isCodeBtnDisabled = Boolean(validatePhone(formData[LOGIN_FIELD.PHONE]));

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleFocusInput = (fieldName: LOGIN_FIELD) => {
		setFormErrors({
			...formErrors,
			[fieldName]: '',
		});
	};

	const handleBlurInput = (fieldName: LOGIN_FIELD) => {
		if (formData[fieldName]) {
			const fieldError = validateLoginForm(fieldName, formData[fieldName]);

			setFormErrors({
				...formErrors,
				[fieldName]: fieldError || '',
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
		handleFocusInput,
		handleBlurInput,
		handleChangeCountry,
		handleChangeLoginMethod,
	};
};

export default useLoginForm;
