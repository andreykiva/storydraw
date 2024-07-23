import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { validateLoginForm } from '@/utils/validators/authValidators';
import { LOGIN_FIELD, LOGIN_METHOD } from '@/constants/auth';
import countries from '@/data/countries';
import type Country from '@/types/Country';
import { validatePhone, validatePassword, validateCode, validateLogin } from '@/utils/validators/commonValidators';
import { transformError } from '@/utils/graphqlUtils';
import { ApolloError, useMutation } from '@apollo/client';
import {
	LOGIN_WITH_EMAIL_AND_PASSWORD,
	LOGIN_WITH_USERNAME_AND_PASSWORD,
	GENERATE_PHONE_CODE_FOR_LOGIN,
	LOGIN_WITH_PHONE_AND_CODE,
} from '@/graphql/auth/mutations';
import { isEmail } from '@/utils/textUtils';
import { setupUserLogin } from '@/utils/authUtils';

type FormData = Record<LOGIN_FIELD, string>;
type FormErrors = Record<LOGIN_FIELD, string>;

const useLoginForm = () => {
	const dispatch = useDispatch();

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

	const [generatePhoneCode, { loading: gpcLoading, error: gpcError }] = useMutation(GENERATE_PHONE_CODE_FOR_LOGIN);

	const [loginWithEmailAndPass, { loading: elLoading, error: elError }] = useMutation(LOGIN_WITH_EMAIL_AND_PASSWORD, {
		onCompleted: (data) => {
			const { access_token, refresh_token, user } = data.loginWithEmailAndPass;
			setupUserLogin(dispatch, access_token, refresh_token, user);
		},
	});
	const [loginWithUsernameAndPass, { loading: ulLoading, error: ulError }] = useMutation(LOGIN_WITH_USERNAME_AND_PASSWORD, {
		onCompleted: (data) => {
			const { access_token, refresh_token, user } = data.loginWithUsernameAndPass;
			setupUserLogin(dispatch, access_token, refresh_token, user);
		},
	});
	const [loginWithPhoneAndCode, { loading: lpcLoading, error: lpcError }] = useMutation(LOGIN_WITH_PHONE_AND_CODE, {
		onCompleted: (data) => {
			const { access_token, refresh_token, user } = data.loginWithPhoneAndCode;
			setupUserLogin(dispatch, access_token, refresh_token, user);
		},
	});

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

	const isFormBtnLoading = elLoading || ulLoading || lpcLoading;
	const isCodeBtnLoading = gpcLoading;

	useEffect(() => {
		handleError(elError, [LOGIN_FIELD.LOGIN, LOGIN_FIELD.PASSWORD]);
	}, [elError]);

	useEffect(() => {
		handleError(ulError, [LOGIN_FIELD.LOGIN, LOGIN_FIELD.PASSWORD]);
	}, [ulError]);

	useEffect(() => {
		handleError(gpcError, [LOGIN_FIELD.PHONE, LOGIN_FIELD.CODE]);
	}, [gpcError]);

	useEffect(() => {
		handleError(lpcError, [LOGIN_FIELD.PHONE, LOGIN_FIELD.CODE]);
	}, [lpcError]);

	const handleError = (error: ApolloError | undefined, fields: LOGIN_FIELD[]) => {
		const errors = transformError(error);
		if (!errors) return;

		fields.forEach((field) => {
			if (field === LOGIN_FIELD.LOGIN && (errors.username || errors.email)) {
				setFormErrors((prevErrors) => ({
					...prevErrors,
					[LOGIN_FIELD.LOGIN]: errors.username || errors.email,
				}));
			}
			if (errors[field]) {
				setFormErrors((prevErrors) => ({
					...prevErrors,
					[field]: errors[field] as string,
				}));
			}
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		resetErrors();

		if (loginMethod === LOGIN_METHOD.LOGIN_AND_PASSWORD) {
			if (isEmail(formData[LOGIN_FIELD.LOGIN])) {
				loginWithEmailAndPass({
					variables: {
						loginInput: {
							email: formData[LOGIN_FIELD.LOGIN],
							password: formData[LOGIN_FIELD.PASSWORD],
						},
					},
				});
			} else {
				loginWithUsernameAndPass({
					variables: {
						loginInput: {
							username: formData[LOGIN_FIELD.LOGIN],
							password: formData[LOGIN_FIELD.PASSWORD],
						},
					},
				});
			}
		} else {
			loginWithPhoneAndCode({
				variables: {
					loginInput: {
						phone: country.phonePrefix + formData[LOGIN_FIELD.PHONE],
						code: formData[LOGIN_FIELD.CODE],
					},
				},
			});
		}
	};

	const handleSendCode = () => {
		resetErrors();
		generatePhoneCode({
			variables: {
				generateCodeInput: { phone: country.phonePrefix + formData[LOGIN_FIELD.PHONE] },
			},
		});
	};

	const resetErrors = () => {
		setFormErrors({
			[LOGIN_FIELD.LOGIN]: '',
			[LOGIN_FIELD.PASSWORD]: '',
			[LOGIN_FIELD.PHONE]: '',
			[LOGIN_FIELD.CODE]: '',
		});
	};

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
		elLoading,
		formData,
		formErrors,
		country,
		loginMethod,
		isFormBtnDisabled,
		isCodeBtnDisabled,
		isFormBtnLoading,
		isCodeBtnLoading,
		handleChangeInput,
		handleBlurInput,
		handleChangeCountry,
		handleChangeLoginMethod,
		handleSubmit,
		handleSendCode,
	};
};

export default useLoginForm;
