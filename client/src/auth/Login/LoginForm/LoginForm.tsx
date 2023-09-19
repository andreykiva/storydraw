import React, { useState } from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
import Input from '@/components/ui/inputs/Input/Input';
import PasswordInput from '@/components/ui/inputs/PasswordInput/PasswordInput';
import CodeInput from '@/components/ui/inputs/CodeInput/CodeInput';
import Button from '@/components/ui/buttons/Button/Button';
import HTag from '@/components/ui/HTag/HTag';
import { validatePhone, validatePassword, validateCode, validateLogin } from '@/utils/validators';
import CountrySelector from '@/components/CountrySelector/CountrySelector';
import countries from '@/data/countries';
import type Country from '@/types/Country';
import FormFooter from './FormFooter/FormFooter';
import FormHeader from './FormHeader/FormHeader';

type WithPhoneProps = {
	openReset: () => void;
};

type LoginMethod = 'loginAndPassword' | 'phoneAndCode' | 'phoneAndPassword';

const LoginForm = ({ openReset }: WithPhoneProps) => {
	const [formData, setFormData] = useState({
		phone: '',
		login: '',
		code: '',
		password: '',
		country: countries[0],
	});

	const [formErrors, setFormErrors] = useState({
		login: '',
		phone: '',
		code: '',
		password: '',
	});

	const [loginMethod, setLoginMethod] = useState<LoginMethod>('phoneAndCode');

	let isFormBtnDisabled = true;

	if (loginMethod === 'loginAndPassword') {
		isFormBtnDisabled = Boolean(validateLogin(formData.login) || validatePassword(formData.password));
	} else if (loginMethod === 'phoneAndCode') {
		isFormBtnDisabled = Boolean(validatePhone(formData.phone) || validateCode(formData.code));
	} else if (loginMethod === 'phoneAndPassword') {
		isFormBtnDisabled = Boolean(validatePhone(formData.phone) || validatePassword(formData.password));
	}

	const isCodeBtnDisabled = Boolean(validatePhone(formData.phone));

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Submit');
	};

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

	return (
		<div>
			<HTag tag="h2" className={authSharedStyles.Title}>
				Log in
			</HTag>
			<form onSubmit={handleSubmit}>
				<FormHeader loginMethod={loginMethod} setLoginMethod={setLoginMethod} />
				{loginMethod === 'loginAndPassword' ? (
					<Input
						type="text"
						name="login"
						placeholder="Email or username"
						value={formData.login}
						error={formErrors.login}
						onChange={handleInputChange}
						onFocus={handleInputFocus.bind(this, 'login')}
						onBlur={handleInputBlur.bind(this, 'login')}
						required
					/>
				) : (
					<div className={authSharedStyles.PhoneField}>
						<CountrySelector
							options={countries}
							selectedOption={formData.country}
							selectOption={handleSelectChange}
						/>
						<Input
							type="text"
							name="phone"
							mode="Phone"
							placeholder="Phone number"
							value={formData.phone}
							error={formErrors.phone}
							onChange={handleInputChange}
							onFocus={handleInputFocus.bind(this, 'phone')}
							onBlur={handleInputBlur.bind(this, 'phone')}
							required
						/>
					</div>
				)}
				{loginMethod === 'phoneAndCode' ? (
					<CodeInput
						name="code"
						placeholder="Enter 6-digit code"
						value={formData.code}
						error={formErrors.code}
						onChange={handleInputChange}
						onFocus={handleInputFocus.bind(this, 'code')}
						onBlur={handleInputBlur.bind(this, 'code')}
						disabled={isCodeBtnDisabled}
						required
					/>
				) : (
					<PasswordInput
						name="password"
						placeholder="Password"
						value={formData.password}
						error={formErrors.password}
						onChange={handleInputChange}
						onFocus={handleInputFocus.bind(this, 'password')}
						onBlur={handleInputBlur.bind(this, 'password')}
						required
					/>
				)}
				<FormFooter loginMethod={loginMethod} openReset={openReset} setLoginMethod={setLoginMethod} />
				<Button className={authSharedStyles.SubmitBtn} type="submit" disabled={isFormBtnDisabled}>
					Log in
				</Button>
			</form>
		</div>
	);
};

export default LoginForm;
