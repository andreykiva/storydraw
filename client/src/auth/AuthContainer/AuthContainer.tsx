import React, { useState } from 'react';
import {
	validatePhone,
	validatePassword,
	validateCode,
	validateLogin,
	validateEmail,
	validateUsername,
} from '@/utils/validators';
import countries from '@/data/countries';
import type Country from '@/types/Country';
import LoginForm from '@/auth/Login/LoginForm/LoginForm';
import RegisterForm from '@/auth/Register/RegisterForm/RegisterForm';
import ResetPasswordForm from '@/auth/Login/ResetPasswordForm/ResetPasswordForm';
import { AUTH_CONTAINER_MODE } from '@/constants/auth';

type AuthContainerProps = {
	authMode: AUTH_CONTAINER_MODE;
	openResetForm?: () => void;
	showRegisterOptions?: () => void;
};

const AuthContainer = ({ authMode, openResetForm, showRegisterOptions }: AuthContainerProps) => {
	const [formData, setFormData] = useState({
		phone: '',
		login: '',
		username: '',
		email: '',
		code: '',
		password: '',
		country: countries[0],
		birthMonth: '',
		birthDay: '',
		birthYear: '',
		sendTrends: false,
	});

	const [formErrors, setFormErrors] = useState({
		login: '',
		username: '',
		email: '',
		phone: '',
		code: '',
		password: '',
	});

	const handleFocusInput = (fieldName: string) => {
		setFormErrors({
			...formErrors,
			[fieldName]: '',
		});
	};

	const handleBlurInput = (fieldName: string) => {
		if (fieldName === 'phone' && formData.phone) {
			const phoneError = validatePhone(formData.phone);
			setFormErrors({
				...formErrors,
				phone: phoneError || '',
			});
		} else if (fieldName === 'email' && formData.email) {
			const emailError = validateEmail(formData.email);
			setFormErrors({
				...formErrors,
				email: emailError || '',
			});
		} else if (fieldName === 'login' && formData.login) {
			const loginError = validateLogin(formData.login);
			setFormErrors({
				...formErrors,
				login: loginError || '',
			});
		} else if (fieldName === 'username' && formData.username) {
			const usernameError = validateUsername(formData.username);
			setFormErrors({
				...formErrors,
				username: usernameError || '',
			});
		} else if (fieldName === 'password' && formData.password) {
			const passwordError = validatePassword(formData.password);
			setFormErrors({
				...formErrors,
				password: passwordError || '',
			});
		} else if (fieldName === 'code' && formData.code) {
			const codeError = validateCode(formData.code);
			setFormErrors({
				...formErrors,
				code: codeError || '',
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

	const handleChangeSelect = (selectedCountry: Country) => {
		setFormData({
			...formData,
			country: selectedCountry,
		});
	};

	const handleChangeCheckbox = () => {
		setFormData({
			...formData,
			sendTrends: !formData.sendTrends,
		});
	};

	const handleChangeBirthday = (fieldName: string, selectedDate: string) => {
		setFormData({
			...formData,
			[fieldName]: selectedDate,
		});
	};

	const formProps = {
		formData,
		formErrors,
		onFocusInput: handleFocusInput,
		onBlurInput: handleBlurInput,
		onChangeInput: handleChangeInput,
		onChangeSelect: handleChangeSelect,
		onChangeCheckbox: handleChangeCheckbox,
		onChangeBirthday: handleChangeBirthday,
	};

	return (
		<>
			{authMode === AUTH_CONTAINER_MODE.LOGIN && <LoginForm openResetForm={openResetForm} {...formProps} />}
			{authMode === AUTH_CONTAINER_MODE.REGISTER && (
				<RegisterForm onShowRegisterOptions={showRegisterOptions} {...formProps} />
			)}
			{authMode === AUTH_CONTAINER_MODE.RESET && <ResetPasswordForm {...formProps} />}
		</>
	);
};

export default AuthContainer;
