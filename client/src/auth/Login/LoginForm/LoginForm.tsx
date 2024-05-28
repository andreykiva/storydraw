import React from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import Input from '@/components/ui/inputs/Input/Input';
import PasswordInput from '@/components/ui/inputs/PasswordInput/PasswordInput';
import CodeInput from '@/components/ui/inputs/CodeInput/CodeInput';
import Button from '@/components/ui/buttons/Button/Button';
import HTag from '@/components/ui/HTag/HTag';
import CountrySelector from '@/auth/CountrySelector/CountrySelector';
import countries from '@/data/countries';
import FormFooter from './FormFooter/FormFooter';
import FormHeader from './FormHeader/FormHeader';
import { LOGIN_FIELD, LOGIN_METHOD } from '@/constants/auth';
import useLoginForm from '@/hooks/forms/useLoginForm';

type LoginFormProps = {
	onOpenResetForm: () => void;
};

const LoginForm = ({ onOpenResetForm }: LoginFormProps) => {
	const {
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
	} = useLoginForm();

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
					onSwitchToPhoneAndCode={() => handleChangeLoginMethod(LOGIN_METHOD.PHONE_AND_CODE)}
					onSwitchToLoginAndPassword={() => handleChangeLoginMethod(LOGIN_METHOD.LOGIN_AND_PASSWORD)}
				/>
				{loginMethod === LOGIN_METHOD.LOGIN_AND_PASSWORD ? (
					<Input
						type="text"
						name={LOGIN_FIELD.LOGIN}
						placeholder="Email or username"
						value={formData[LOGIN_FIELD.LOGIN]}
						error={formErrors[LOGIN_FIELD.LOGIN]}
						onChange={handleChangeInput}
						onFocus={() => handleFocusInput(LOGIN_FIELD.LOGIN)}
						onBlur={() => handleBlurInput(LOGIN_FIELD.LOGIN)}
						required
					/>
				) : (
					<div className={authSharedStyles.PhoneField}>
						<CountrySelector
							options={countries}
							selectedOption={country}
							selectOption={handleChangeCountry}
						/>
						<Input
							type="text"
							name={LOGIN_FIELD.PHONE}
							mode="Phone"
							placeholder="Phone number"
							value={formData[LOGIN_FIELD.PHONE]}
							error={formErrors[LOGIN_FIELD.PHONE]}
							onChange={handleChangeInput}
							onFocus={() => handleFocusInput(LOGIN_FIELD.PHONE)}
							onBlur={() => handleBlurInput(LOGIN_FIELD.PHONE)}
							required
						/>
					</div>
				)}
				{loginMethod === LOGIN_METHOD.PHONE_AND_CODE ? (
					<CodeInput
						name={LOGIN_FIELD.CODE}
						placeholder="Enter 6-digit code"
						value={formData[LOGIN_FIELD.CODE]}
						error={formErrors[LOGIN_FIELD.CODE]}
						onChange={handleChangeInput}
						onFocus={() => handleFocusInput(LOGIN_FIELD.CODE)}
						onBlur={() => handleBlurInput(LOGIN_FIELD.CODE)}
						disabled={isCodeBtnDisabled}
						required
					/>
				) : (
					<PasswordInput
						name={LOGIN_FIELD.PASSWORD}
						placeholder="Password"
						value={formData[LOGIN_FIELD.PASSWORD]}
						error={formErrors[LOGIN_FIELD.PASSWORD]}
						onChange={handleChangeInput}
						onFocus={() => handleFocusInput(LOGIN_FIELD.PASSWORD)}
						onBlur={() => handleBlurInput(LOGIN_FIELD.PASSWORD)}
						required
					/>
				)}
				<FormFooter
					isPhoneAndPassword={loginMethod === LOGIN_METHOD.PHONE_AND_PASSWORD}
					isPhoneAndCode={loginMethod === LOGIN_METHOD.PHONE_AND_CODE}
					onOpenResetForm={onOpenResetForm}
					onSwitchToPhoneAndPassword={() => handleChangeLoginMethod(LOGIN_METHOD.PHONE_AND_PASSWORD)}
					onSwitchToPhoneAndCode={() => handleChangeLoginMethod(LOGIN_METHOD.PHONE_AND_CODE)}
				/>
				<Button className={authSharedStyles.SubmitBtn} type="submit" disabled={isFormBtnDisabled}>
					Log in
				</Button>
			</form>
		</>
	);
};

export default LoginForm;
