import { useState } from 'react';
import { validateRegisterForm } from '@/utils/validators/authValidators';
import { REGISTER_FIELD, BIRTH_FIELD } from '@/constants/auth';
import countries from '@/data/countries';
import type Country from '@/types/Country';
import {
	validatePhone,
	validatePassword,
	validateCode,
	validateEmail,
	validateUsername,
} from '@/utils/validators/commonValidators';

type FormData = Record<REGISTER_FIELD, string>;
type FormErrors = Record<REGISTER_FIELD, string>;
type BirthData = Record<BIRTH_FIELD, string>;

const useRegisterForm = () => {
	const [formData, setFormData] = useState<FormData>({
		[REGISTER_FIELD.EMAIL]: '',
		[REGISTER_FIELD.USERNAME]: '',
		[REGISTER_FIELD.PASSWORD]: '',
		[REGISTER_FIELD.PHONE]: '',
		[REGISTER_FIELD.CODE]: '',
	});

	const [formErrors, setFormErrors] = useState<FormErrors>({
		[REGISTER_FIELD.EMAIL]: '',
		[REGISTER_FIELD.USERNAME]: '',
		[REGISTER_FIELD.PASSWORD]: '',
		[REGISTER_FIELD.PHONE]: '',
		[REGISTER_FIELD.CODE]: '',
	});

	const [birthData, setBirhtData] = useState<BirthData>({
		[BIRTH_FIELD.BIRHT_DAY]: '',
		[BIRTH_FIELD.BIRTH_MONTH]: '',
		[BIRTH_FIELD.BIRTH_YEAR]: '',
	});

	const [country, setCountry] = useState(countries[0]);
	const [sendTrends, setSendTrends] = useState(false);
	const [isPhoneMode, setIsPhoneMode] = useState(true);
	const [showUsernameField, setShowUsernameField] = useState(false);

	const isBirthDateIncomplete =
		!birthData[BIRTH_FIELD.BIRTH_MONTH] || !birthData[BIRTH_FIELD.BIRHT_DAY] || !birthData[BIRTH_FIELD.BIRTH_YEAR];
	const isCodeInvalid = validateCode(formData[REGISTER_FIELD.CODE]);
	const isPhoneInvalid = validatePhone(formData[REGISTER_FIELD.PHONE]);
	const isEmailInvalid = validateEmail(formData[REGISTER_FIELD.EMAIL]);
	const isPasswordInvalid = validatePassword(formData[REGISTER_FIELD.PASSWORD]);
	const isUsernameInvalid = validateUsername(formData[REGISTER_FIELD.USERNAME]);

	const isNextBtnDisabled = Boolean(
		isBirthDateIncomplete || isCodeInvalid || isPhoneInvalid || isEmailInvalid || isPasswordInvalid,
	);
	const isCodeBtnDisabled = Boolean(isPhoneMode ? isPhoneInvalid : isEmailInvalid);
	const isFormBtnDisabled = Boolean(isUsernameInvalid);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleChangeBirth = (fieldName: BIRTH_FIELD, value: string) => {
		setBirhtData({
			...birthData,
			[fieldName]: value,
		});
	};

	const handleFocusInput = (fieldName: REGISTER_FIELD) => {
		setFormErrors({
			...formErrors,
			[fieldName]: '',
		});
	};

	const handleBlurInput = (fieldName: REGISTER_FIELD) => {
		if (formData[fieldName]) {
			const fieldError = validateRegisterForm(fieldName, formData[fieldName]);

			setFormErrors({
				...formErrors,
				[fieldName]: fieldError || '',
			});
		}
	};

	const handleChangeCountry = (selectedCountry: Country) => {
		setCountry(selectedCountry);
	};

	const handleToggleSendTrends = () => {
		setSendTrends(!sendTrends);
	};

	return {
		formData,
		formErrors,
		country,
		birthData,
		sendTrends,
		isPhoneMode,
		showUsernameField,
		isNextBtnDisabled,
		isFormBtnDisabled,
		isCodeBtnDisabled,
		handleChangeInput,
		handleFocusInput,
		handleBlurInput,
		handleChangeCountry,
		handleToggleSendTrends,
		handleChangeBirth,
		handleChangeIsPhoneMode: setIsPhoneMode,
		handleChangeShowUsernameField: setShowUsernameField,
	};
};

export default useRegisterForm;
