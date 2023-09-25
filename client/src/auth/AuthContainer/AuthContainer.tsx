import React, { useState } from 'react';
import { validatePhone, validatePassword, validateCode, validateLogin, validateEmail } from '@/utils/validators';
import countries from '@/data/countries';
import type Country from '@/types/Country';
import LoginForm from '../Login/LoginForm/LoginForm';
import RegisterForm from '../Register/RegisterForm/RegisterForm';
import ResetPasswordForm from '../Login/ResetPasswordForm/ResetPasswordForm';

type AuthContainerProps = {
	authMode: 'registerForm' | 'loginForm' | 'resetForm';
	openResetForm?: () => void;
};

const AuthContainer = ({ authMode, openResetForm }: AuthContainerProps) => {
	const [formData, setFormData] = useState({
		phone: '',
		login: '',
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
		email: '',
		phone: '',
		code: '',
		password: '',
	});

	const handleInputFocus = (fieldName: string) => {
		setFormErrors({
			...formErrors,
			[fieldName]: '',
		});
	};

	const handleInputBlur = (fieldName: string) => {
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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSelectChange = (selectedCountry: Country) => {
		setFormData({
			...formData,
			country: selectedCountry,
		});
	};

	const handleCheckboxChange = () => {
		setFormData({
			...formData,
			sendTrends: !formData.sendTrends,
		});
	};

	const handleBirthdayChange = (fieldName: string, selectedDate: string) => {
		setFormData({
			...formData,
			[fieldName]: selectedDate,
		});
	};

	const formProps = {
		formData,
		formErrors,
		handleInputFocus,
		handleInputBlur,
		handleInputChange,
		handleSelectChange,
		handleCheckboxChange,
		handleBirthdayChange,
	};

	return (
		<>
			{authMode === 'loginForm' && <LoginForm openResetForm={openResetForm} {...formProps} />}
			{authMode === 'registerForm' && <RegisterForm {...formProps} />}
			{authMode === 'resetForm' && <ResetPasswordForm {...formProps} />}
		</>
	);
};

export default AuthContainer;
