import React, { useState } from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
import Input from '@/components/ui/inputs/Input/Input';
import PasswordInput from '@/components/ui/inputs/PasswordInput/PasswordInput';
import CodeInput from '@/components/ui/inputs/CodeInput/CodeInput';
import Button from '@/components/ui/buttons/Button/Button';
import HTag from '@/components/ui/HTag/HTag';
import { validatePhone, validatePassword, validateCode, validateLogin } from '@/utils/validators';
import CountrySelector from '@/auth/CountrySelector/CountrySelector';
import countries from '@/data/countries';
import type Country from '@/types/Country';
import type { FormData, FormErrors } from '@/types/Auth';
import FormFooter from './FormFooter/FormFooter';
import FormHeader from './FormHeader/FormHeader';

type LoginFormProps = {
	openResetForm: () => void;
	formData: FormData;
	formErrors: FormErrors;
	handleFocusInput: (fieldName: string) => void;
	handleBlurInput: (fieldName: string) => void;
	handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleChangeSelect: (selectedCountry: Country) => void;
};

type LoginMethod = 'loginAndPassword' | 'phoneAndCode' | 'phoneAndPassword';

const LoginForm = (props: LoginFormProps) => {
	const {
		formData,
		formErrors,
		openResetForm,
		handleFocusInput,
		handleBlurInput,
		handleChangeInput,
		handleChangeSelect,
	} = props;

	const [loginMethod, setLoginMethod] = useState<LoginMethod>('phoneAndCode');

	// isFormBtnDisabled
	const validationMethods = {
		loginAndPassword: () => validateLogin(formData.login) || validatePassword(formData.password),
		phoneAndCode: () => validatePhone(formData.phone) || validateCode(formData.code),
		phoneAndPassword: () => validatePhone(formData.phone) || validatePassword(formData.password),
	};

	const isFormBtnDisabled = Boolean(validationMethods[loginMethod]());

	//isCodeBtnDisabled
	const isCodeBtnDisabled = Boolean(validatePhone(formData.phone));

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Submit');
	};

	return (
		<>
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
						onChange={handleChangeInput}
						onFocus={handleFocusInput.bind(this, 'login')}
						onBlur={handleBlurInput.bind(this, 'login')}
						required
					/>
				) : (
					<div className={authSharedStyles.PhoneField}>
						<CountrySelector
							options={countries}
							selectedOption={formData.country}
							selectOption={handleChangeSelect}
						/>
						<Input
							type="text"
							name="phone"
							mode="Phone"
							placeholder="Phone number"
							value={formData.phone}
							error={formErrors.phone}
							onChange={handleChangeInput}
							onFocus={handleFocusInput.bind(this, 'phone')}
							onBlur={handleBlurInput.bind(this, 'phone')}
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
						onChange={handleChangeInput}
						onFocus={handleFocusInput.bind(this, 'code')}
						onBlur={handleBlurInput.bind(this, 'code')}
						disabled={isCodeBtnDisabled}
						required
					/>
				) : (
					<PasswordInput
						name="password"
						placeholder="Password"
						value={formData.password}
						error={formErrors.password}
						onChange={handleChangeInput}
						onFocus={handleFocusInput.bind(this, 'password')}
						onBlur={handleBlurInput.bind(this, 'password')}
						required
					/>
				)}
				<FormFooter loginMethod={loginMethod} openResetForm={openResetForm} setLoginMethod={setLoginMethod} />
				<Button className={authSharedStyles.SubmitBtn} type="submit" disabled={isFormBtnDisabled}>
					Log in
				</Button>
			</form>
		</>
	);
};

export default LoginForm;
