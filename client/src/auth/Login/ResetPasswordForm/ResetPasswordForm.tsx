import React, { useState } from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import Input from '@/components/ui/inputs/Input/Input';
import PasswordInput from '@/components/ui/inputs/PasswordInput/PasswordInput';
import CodeInput from '@/components/ui/inputs/CodeInput/CodeInput';
import Button from '@/components/ui/buttons/Button/Button';
import { validatePhone, validatePassword, validateCode, validateEmail } from '@/utils/validators';
import CountrySelector from '@/auth/CountrySelector/CountrySelector';
import HTag from '@/components/ui/HTag/HTag';
import countries from '@/data/countries';
import type Country from '@/types/Country';
import type { FormData, FormErrors } from '@/types/Auth';
import FormHeader from './FormHeader/FormHeader';

type ResetPasswordFormProps = {
	formData: FormData;
	formErrors: FormErrors;
	onFocusInput: (fieldName: string) => void;
	onBlurInput: (fieldName: string) => void;
	onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeSelect: (selectedCountry: Country) => void;
};

const ResetPasswordForm = (props: ResetPasswordFormProps) => {
	const { formData, formErrors, onFocusInput, onBlurInput, onChangeInput, onChangeSelect } = props;

	const [isPhoneMode, setIsPhoneMode] = useState(false);

	//isFormBtnDisabled
	const isInvalidPassword = validatePassword(formData.password);
	const isInvalidCode = validateCode(formData.code);
	const isInvalidPhoneOrEmail = isPhoneMode ? validatePhone(formData.phone) : validateEmail(formData.email);

	const isFormBtnDisabled = Boolean(isInvalidPassword || isInvalidCode || isInvalidPhoneOrEmail);

	//isCodeBtnDisabled
	const isCodeBtnDisabled = Boolean(isPhoneMode ? validatePhone(formData.phone) : validateEmail(formData.email));

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Submit');
	};

	return (
		<>
			<HTag tag="h2" className={authSharedStyles.Title}>
				Reset password
			</HTag>
			<form onSubmit={handleSubmit}>
				<FormHeader
					isPhoneMode={isPhoneMode}
					onEnablePhoneMode={setIsPhoneMode.bind(this, true)}
					onDisablePhoneMode={setIsPhoneMode.bind(this, false)}
				/>
				{isPhoneMode ? (
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
				) : (
					<Input
						type="text"
						name="email"
						mode="Email"
						placeholder="Email address"
						value={formData.email}
						error={formErrors.email}
						onChange={onChangeInput}
						onFocus={onFocusInput.bind(this, 'email')}
						onBlur={onBlurInput.bind(this, 'email')}
						required
					/>
				)}
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
				<Button className={authSharedStyles.SubmitBtn} type="submit" disabled={isFormBtnDisabled}>
					Log in
				</Button>
			</form>
		</>
	);
};

export default ResetPasswordForm;
