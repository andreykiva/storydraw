import React, { useState } from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
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
	onFocusInput: (fieldName: string) => void;
	onBlurInput: (fieldName: string) => void;
	onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeSelect: (selectedCountry: Country) => void;
};

const enum LOGIN_METHOD {
	LOGIN_AND_PASSWORD = 'loginAndPassword',
	PHONE_AND_CODE = 'phoneAndCode',
	PHONE_AND_PASSWORD = 'phoneAndPassword',
}

type LoginMethod = (typeof LOGIN_METHOD)[keyof typeof LOGIN_METHOD];

const LoginForm = (props: LoginFormProps) => {
	const { formData, formErrors, openResetForm, onFocusInput, onBlurInput, onChangeInput, onChangeSelect } = props;

	const [loginMethod, setLoginMethod] = useState<LoginMethod>(LOGIN_METHOD.PHONE_AND_CODE);

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
				<FormHeader
					isLoginAndPassword={loginMethod === LOGIN_METHOD.LOGIN_AND_PASSWORD}
					onSwitchToPhoneAndCode={setLoginMethod.bind(this, LOGIN_METHOD.PHONE_AND_CODE)}
					onSwitchToLoginAndPassword={setLoginMethod.bind(this, LOGIN_METHOD.LOGIN_AND_PASSWORD)}
				/>
				{loginMethod === LOGIN_METHOD.LOGIN_AND_PASSWORD ? (
					<Input
						type="text"
						name="login"
						placeholder="Email or username"
						value={formData.login}
						error={formErrors.login}
						onChange={onChangeInput}
						onFocus={onFocusInput.bind(this, 'login')}
						onBlur={onBlurInput.bind(this, 'login')}
						required
					/>
				) : (
					<div className={authSharedStyles.PhoneField}>
						<CountrySelector
							options={countries}
							selectedOption={formData.country}
							selectOption={onChangeSelect}
						/>
						<Input
							type="text"
							name="phone"
							mode="Phone"
							placeholder="Phone number"
							value={formData.phone}
							error={formErrors.phone}
							onChange={onChangeInput}
							onFocus={onFocusInput.bind(this, 'phone')}
							onBlur={onBlurInput.bind(this, 'phone')}
							required
						/>
					</div>
				)}
				{loginMethod === LOGIN_METHOD.PHONE_AND_CODE ? (
					<CodeInput
						name="code"
						placeholder="Enter 6-digit code"
						value={formData.code}
						error={formErrors.code}
						onChange={onChangeInput}
						onFocus={onFocusInput.bind(this, 'code')}
						onBlur={onBlurInput.bind(this, 'code')}
						disabled={isCodeBtnDisabled}
						required
					/>
				) : (
					<PasswordInput
						name="password"
						placeholder="Password"
						value={formData.password}
						error={formErrors.password}
						onChange={onChangeInput}
						onFocus={onFocusInput.bind(this, 'password')}
						onBlur={onBlurInput.bind(this, 'password')}
						required
					/>
				)}
				<FormFooter
					isPhoneAndPassword={loginMethod === LOGIN_METHOD.PHONE_AND_PASSWORD}
					isPhoneAndCode={loginMethod === LOGIN_METHOD.PHONE_AND_CODE}
					onOpenResetForm={openResetForm}
					onSwitchToPhoneAndPassword={setLoginMethod.bind(this, LOGIN_METHOD.PHONE_AND_PASSWORD)}
					onSwitchToPhoneAndCode={setLoginMethod.bind(this, LOGIN_METHOD.PHONE_AND_CODE)}
				/>
				<Button className={authSharedStyles.SubmitBtn} type="submit" disabled={isFormBtnDisabled}>
					Log in
				</Button>
			</form>
		</>
	);
};

export default LoginForm;
