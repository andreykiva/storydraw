import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { validateResetPasswordForm } from '@/utils/validators/authValidators';
import { RESET_PASSWORD_FIELD } from '@/constants/auth';
import countries from '@/data/countries';
import type Country from '@/types/Country';
import { validatePhone, validatePassword, validateCode, validateEmail } from '@/utils/validators/commonValidators';
import { ApolloError, useMutation } from '@apollo/client';
import {
	GENERATE_EMAIL_CODE_FOR_RESET,
	GENERATE_PHONE_CODE_FOR_RESET,
	RESET_PASSWORD_WITH_EMAIL,
	RESET_PASSWORD_WITH_PHONE,
} from '@/graphql/auth/mutations';
import { transformError } from '@/utils/graphqlUtils';
import { setupUserLogin } from '@/utils/authUtils';

type FormData = Record<RESET_PASSWORD_FIELD, string>;
type FormErrors = Record<RESET_PASSWORD_FIELD, string>;

const useResetPasswordForm = () => {
	const dispatch = useDispatch();

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

	const [generatePhoneCode, { loading: gpcLoading, error: gpcError }] = useMutation(GENERATE_PHONE_CODE_FOR_RESET);
	const [generateEmailCode, { loading: gecLoading, error: gecError }] = useMutation(GENERATE_EMAIL_CODE_FOR_RESET);

	const [resetPasswordWithPhone, { loading: rppLoading, error: rppError }] = useMutation(RESET_PASSWORD_WITH_PHONE, {
		onCompleted: (data) => {
			const { access_token, refresh_token, user } = data.resetPasswordWithPhone;
			setupUserLogin(dispatch, access_token, refresh_token, user);
		},
	});

	const [resetPasswordWithEmail, { loading: rpeLoading, error: rpeError }] = useMutation(RESET_PASSWORD_WITH_EMAIL, {
		onCompleted: (data) => {
			const { access_token, refresh_token, user } = data.resetPasswordWithEmail;
			setupUserLogin(dispatch, access_token, refresh_token, user);
		},
	});

	const isPasswordInvalid = validatePassword(formData[RESET_PASSWORD_FIELD.PASSWORD]);
	const isCodeInvalid = validateCode(formData[RESET_PASSWORD_FIELD.CODE]);
	const isPhoneInvalid = validatePhone(formData[RESET_PASSWORD_FIELD.PHONE]);
	const isEmailInvalid = validateEmail(formData[RESET_PASSWORD_FIELD.EMAIL]);

	const isFormBtnDisabled = Boolean(
		isPhoneMode ? isPhoneInvalid || isCodeInvalid || isPasswordInvalid : isEmailInvalid || isCodeInvalid || isPasswordInvalid,
	);
	const isCodeBtnDisabled = Boolean(isPhoneMode ? isPhoneInvalid : isEmailInvalid);

	const isFormBtnLoading = rppLoading || rpeLoading;
	const isCodeBtnLoading = gpcLoading || gecLoading;

	useEffect(() => {
		handleError(gpcError, [RESET_PASSWORD_FIELD.PHONE, RESET_PASSWORD_FIELD.CODE]);
	}, [gpcError]);

	useEffect(() => {
		handleError(gecError, [RESET_PASSWORD_FIELD.EMAIL, RESET_PASSWORD_FIELD.CODE]);
	}, [gecError]);

	useEffect(() => {
		handleError(rppError, [RESET_PASSWORD_FIELD.PHONE, RESET_PASSWORD_FIELD.CODE, RESET_PASSWORD_FIELD.PASSWORD]);
	}, [rppError]);

	useEffect(() => {
		handleError(rpeError, [RESET_PASSWORD_FIELD.EMAIL, RESET_PASSWORD_FIELD.CODE, RESET_PASSWORD_FIELD.PASSWORD]);
	}, [rpeError]);

	const handleError = (error: ApolloError | undefined, fields: RESET_PASSWORD_FIELD[]) => {
		const errors = transformError(error);
		if (!errors) return;

		fields.forEach((field) => {
			if (errors[field]) {
				setFormErrors((prevErrors) => ({
					...prevErrors,
					[field]: errors[field] as string,
				}));
			}
		});
	};

	const resetErrors = () => {
		setFormErrors({
			[RESET_PASSWORD_FIELD.EMAIL]: '',
			[RESET_PASSWORD_FIELD.PASSWORD]: '',
			[RESET_PASSWORD_FIELD.PHONE]: '',
			[RESET_PASSWORD_FIELD.CODE]: '',
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		resetErrors();

		if (isPhoneMode) {
			resetPasswordWithPhone({
				variables: {
					resetPasswordInput: {
						phone: country.phonePrefix + formData[RESET_PASSWORD_FIELD.PHONE],
						code: formData[RESET_PASSWORD_FIELD.CODE],
						password: formData[RESET_PASSWORD_FIELD.PASSWORD],
					},
				},
			});
		} else {
			resetPasswordWithEmail({
				variables: {
					resetPasswordInput: {
						email: formData[RESET_PASSWORD_FIELD.EMAIL],
						code: formData[RESET_PASSWORD_FIELD.CODE],
						password: formData[RESET_PASSWORD_FIELD.PASSWORD],
					},
				},
			});
		}
	};

	const handleSendCode = () => {
		setFormErrors({
			...formErrors,
			[RESET_PASSWORD_FIELD.PHONE]: '',
			[RESET_PASSWORD_FIELD.EMAIL]: '',
			[RESET_PASSWORD_FIELD.CODE]: '',
		});

		if (isPhoneMode) {
			generatePhoneCode({
				variables: {
					generateCodeInput: { phone: country.phonePrefix + formData[RESET_PASSWORD_FIELD.PHONE] },
				},
			});
		} else {
			generateEmailCode({
				variables: {
					generateCodeInput: { email: formData[RESET_PASSWORD_FIELD.EMAIL] },
				},
			});
		}
	};

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
		isFormBtnLoading,
		isCodeBtnLoading,
		handleChangeInput,
		handleBlurInput,
		handleChangeCountry,
		handleChangeIsPhoneMode: setIsPhoneMode,
		handleSubmit,
		handleSendCode,
	};
};

export default useResetPasswordForm;
