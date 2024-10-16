import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { validateRegisterForm } from '@/utils/validators/authValidators';
import { REGISTER_FIELD, BIRTH_FIELD } from '@/constants/auth';
import countries from '@/data/countries';
import type Country from '@/types/Country';
import { validatePhone, validatePassword, validateCode, validateEmail, validateUsername } from '@/utils/validators/commonValidators';
import { ApolloError, useLazyQuery, useMutation } from '@apollo/client';
import {
	GENERATE_EMAIL_CODE_FOR_SIGNUP,
	GENERATE_PHONE_CODE_FOR_SIGNUP,
	SIGNUP_WITH_EMAIL_AND_PASS_AND_CODE,
	SIGNUP_WITH_PHONE_AND_CODE,
} from '@/graphql/auth/mutations';
import { transformError } from '@/utils/graphqlUtils';
import { formatBirthday } from '@/utils/dateUtils';
import { login } from '@/features/auth/authSlice';
import { ENSURE_USERNAME_NOT_EXISTS } from '@/graphql/users/queries';
import { UPDATE_USERNAME } from '@/graphql/users/mutations';
import { setupCreateUsername, setupUserAndTokens } from '@/utils/authUtils';

type FormData = Record<REGISTER_FIELD, string>;
type FormErrors = Record<REGISTER_FIELD, string>;
type BirthData = Record<BIRTH_FIELD, string>;

const useRegisterForm = () => {
	const dispatch = useDispatch();

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
		[BIRTH_FIELD.DAY]: '',
		[BIRTH_FIELD.MONTH]: '',
		[BIRTH_FIELD.YEAR]: '',
	});

	const [country, setCountry] = useState(countries[0]);
	const [sendTrends, setSendTrends] = useState(false);
	const [isPhoneMode, setIsPhoneMode] = useState(true);
	const [showUsernameField, setShowUsernameField] = useState(false);
	const [isUsernameLoading, setIsUsernameLoading] = useState(false);

	const [generatePhoneCode, { loading: gpcLoading }] = useMutation(GENERATE_PHONE_CODE_FOR_SIGNUP, {
		onError(error) {
			handleError(error, [REGISTER_FIELD.PHONE, REGISTER_FIELD.CODE]);
		},
	});

	const [generateEmailCode, { loading: gecLoading }] = useMutation(GENERATE_EMAIL_CODE_FOR_SIGNUP, {
		onError(error) {
			handleError(error, [REGISTER_FIELD.EMAIL, REGISTER_FIELD.CODE]);
		},
	});

	const [signupWithPhoneAndCode, { loading: spLoading}] = useMutation(SIGNUP_WITH_PHONE_AND_CODE, {
		onCompleted(data) {
			const { access_token, refresh_token, user } = data.signupWithPhoneAndCode;
			setupUserAndTokens(dispatch, access_token, refresh_token, user);
			setShowUsernameField(true);
		},
		onError(error) {
			handleError(error, [REGISTER_FIELD.PHONE, REGISTER_FIELD.CODE]);
		},
	});

	const [signupWithEmailAndPassAndCode, { loading: seLoading }] = useMutation(SIGNUP_WITH_EMAIL_AND_PASS_AND_CODE, {
		onCompleted(data) {
			const { access_token, refresh_token, user } = data.signupWithEmailAndPassAndCode;
			setupUserAndTokens(dispatch, access_token, refresh_token, user);
			setShowUsernameField(true);
		},
		onError(error) {
			handleError(error, [REGISTER_FIELD.EMAIL, REGISTER_FIELD.PASSWORD, REGISTER_FIELD.CODE]);
		},
	});

	const [findUser, { loading: findUserLoading }] = useLazyQuery(ENSURE_USERNAME_NOT_EXISTS, {
		onCompleted(data) {
			if (data.ensureUsernameNotExists.exists === false) {
				setFormErrors({
					...formErrors,
					[REGISTER_FIELD.USERNAME]: '',
				});
			}
			setIsUsernameLoading(false);
		},
		onError(error) {
			handleError(error, [REGISTER_FIELD.USERNAME]);
			setIsUsernameLoading(false);
		},
		fetchPolicy: 'no-cache',
	});

	const [createUsername, { loading: createUsernameLoading }] = useMutation(UPDATE_USERNAME, {
		onCompleted(data) {
			setupCreateUsername(dispatch, data.updateUsername);
		},
		onError(error) {
			handleError(error, [REGISTER_FIELD.USERNAME]);
		},
	});

	const isBirthDateIncomplete = !birthData[BIRTH_FIELD.MONTH] || !birthData[BIRTH_FIELD.DAY] || !birthData[BIRTH_FIELD.YEAR];
	const isCodeInvalid = validateCode(formData[REGISTER_FIELD.CODE]);
	const isPhoneInvalid = validatePhone(formData[REGISTER_FIELD.PHONE]);
	const isEmailInvalid = validateEmail(formData[REGISTER_FIELD.EMAIL]);
	const isPasswordInvalid = validatePassword(formData[REGISTER_FIELD.PASSWORD]);
	const isUsernameInvalid = validateUsername(formData[REGISTER_FIELD.USERNAME]);

	const isFormBtnDisabled = Boolean(
		isPhoneMode
			? isBirthDateIncomplete || isCodeInvalid || isPhoneInvalid
			: isBirthDateIncomplete || isCodeInvalid || isEmailInvalid || isPasswordInvalid,
	);
	const isCodeBtnDisabled = Boolean(isPhoneMode ? isPhoneInvalid : isEmailInvalid);

	const isFormBtnLoading = spLoading || seLoading;
	const isCodeBtnLoading = gpcLoading || gecLoading;

	const isUsernameError = !!formErrors[REGISTER_FIELD.USERNAME];

	const isUsernameBtnDisabled = Boolean(isUsernameInvalid || findUserLoading || isUsernameError || isUsernameLoading);

	const handleFindUser = (value: string) => {
		findUser({
			variables: {
				usernameInput: {
					username: value,
				},
			},
		});
	};

	const handleError = (error: ApolloError | undefined, fields: REGISTER_FIELD[]) => {
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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		resetErrors();

		if (isPhoneMode) {
			signupWithPhoneAndCode({
				variables: {
					signupInput: {
						phone: country.phonePrefix + formData[REGISTER_FIELD.PHONE],
						code: formData[REGISTER_FIELD.CODE],
						dateOfBirth: formatBirthday(birthData[BIRTH_FIELD.YEAR], birthData[BIRTH_FIELD.MONTH], birthData[BIRTH_FIELD.DAY]),
					},
				},
			});
		} else {
			signupWithEmailAndPassAndCode({
				variables: {
					signupInput: {
						email: formData[REGISTER_FIELD.EMAIL],
						password: formData[REGISTER_FIELD.PASSWORD],
						code: formData[REGISTER_FIELD.CODE],
						dateOfBirth: formatBirthday(birthData[BIRTH_FIELD.YEAR], birthData[BIRTH_FIELD.MONTH], birthData[BIRTH_FIELD.DAY]),
						receiveEmailUpdates: sendTrends,
					},
				},
			});
		}
	};

	const handleSendCode = () => {
		setFormErrors({
			...formErrors,
			[REGISTER_FIELD.EMAIL]: '',
			[REGISTER_FIELD.PHONE]: '',
			[REGISTER_FIELD.CODE]: '',
		});

		if (isPhoneMode) {
			generatePhoneCode({
				variables: {
					generateCodeInput: { phone: country.phonePrefix + formData[REGISTER_FIELD.PHONE] },
				},
			});
		} else {
			generateEmailCode({
				variables: {
					generateCodeInput: { email: formData[REGISTER_FIELD.EMAIL] },
				},
			});
		}
	};

	const handleSubmitUsername = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		createUsername({
			variables: {
				usernameInput: {
					username: formData[REGISTER_FIELD.USERNAME],
				},
			},
		});
	};

	const resetErrors = () => {
		setFormErrors({
			[REGISTER_FIELD.EMAIL]: '',
			[REGISTER_FIELD.USERNAME]: '',
			[REGISTER_FIELD.PASSWORD]: '',
			[REGISTER_FIELD.PHONE]: '',
			[REGISTER_FIELD.CODE]: '',
		});
	};

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name === REGISTER_FIELD.USERNAME) {
			setIsUsernameLoading(true);
		}

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

	const handleBlurInput = (fieldName: REGISTER_FIELD) => {
		if (formData[fieldName]) {
			const fieldError = validateRegisterForm(fieldName, formData[fieldName]);

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

	const handleToggleSendTrends = () => {
		setSendTrends(!sendTrends);
	};

	const handleSkip = () => {
		dispatch(login());
	};

	return {
		formData,
		formErrors,
		country,
		birthData,
		sendTrends,
		isPhoneMode,
		showUsernameField,
		isFormBtnDisabled,
		isUsernameBtnDisabled,
		isCodeBtnDisabled,
		isFormBtnLoading,
		isCodeBtnLoading,
		isUsernameInputLoading: findUserLoading,
		isUsernameBtnLoading: createUsernameLoading,
		handleChangeInput,
		handleBlurInput,
		handleChangeCountry,
		handleToggleSendTrends,
		handleChangeBirth,
		handleChangeIsPhoneMode: setIsPhoneMode,
		handleSubmit,
		handleSendCode,
		handleSubmitUsername,
		handleSkip,
		handleFindUser,
	};
};

export default useRegisterForm;
