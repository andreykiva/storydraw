import React from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import Input from '@/components/ui/inputs/Input/Input';
import PasswordInput from '@/components/ui/inputs/PasswordInput/PasswordInput';
import CodeInput from '@/components/ui/inputs/CodeInput/CodeInput';
import Button from '@/components/ui/buttons/Button/Button';
import CountrySelector from '@/components/CountrySelector/CountrySelector';
import HTag from '@/components/ui/HTag/HTag';
import FormHeader from './FormHeader/FormHeader';
import { RESET_PASSWORD_FIELD } from '@/constants/auth';
import useResetPasswordForm from '@/hooks/forms/useResetPasswordForm';
import { INPUT_MODE } from '@/constants/ui';

const ResetPasswordForm = () => {
	const {
		formData,
		formErrors,
		country,
		isPhoneMode,
		isFormBtnDisabled,
		isCodeBtnDisabled,
		handleChangeInput,
		handleBlurInput,
		handleChangeCountry,
		handleChangeIsPhoneMode,
	} = useResetPasswordForm();

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
					onEnablePhoneMode={() => handleChangeIsPhoneMode(true)}
					onDisablePhoneMode={() => handleChangeIsPhoneMode(false)}
				/>
				{isPhoneMode ? (
					<div className={authSharedStyles.PhoneField}>
						<CountrySelector
							selectedOption={country}
							selectOption={handleChangeCountry}
							showPhonePrefix={true}
						/>
						<Input
							type="text"
							name={RESET_PASSWORD_FIELD.PHONE}
							mode={INPUT_MODE.PHONE}
							placeholder="Phone number"
							value={formData[RESET_PASSWORD_FIELD.PHONE]}
							error={formErrors[RESET_PASSWORD_FIELD.PHONE]}
							onChange={handleChangeInput}
							onBlur={() => handleBlurInput(RESET_PASSWORD_FIELD.PHONE)}
							required
						/>
					</div>
				) : (
					<Input
						type="text"
						name={RESET_PASSWORD_FIELD.EMAIL}
						placeholder="Email address"
						value={formData[RESET_PASSWORD_FIELD.EMAIL]}
						error={formErrors[RESET_PASSWORD_FIELD.EMAIL]}
						onChange={handleChangeInput}
						onBlur={() => handleBlurInput(RESET_PASSWORD_FIELD.EMAIL)}
						required
					/>
				)}
				<CodeInput
					name={RESET_PASSWORD_FIELD.CODE}
					placeholder="Enter 6-digit code"
					value={formData[RESET_PASSWORD_FIELD.CODE]}
					error={formErrors[RESET_PASSWORD_FIELD.CODE]}
					onChange={handleChangeInput}
					onBlur={() => handleBlurInput(RESET_PASSWORD_FIELD.CODE)}
					disabled={isCodeBtnDisabled}
					required
				/>
				<PasswordInput
					name={RESET_PASSWORD_FIELD.PASSWORD}
					placeholder="Password"
					value={formData[RESET_PASSWORD_FIELD.PASSWORD]}
					error={formErrors[RESET_PASSWORD_FIELD.PASSWORD]}
					onChange={handleChangeInput}
					onBlur={() => handleBlurInput(RESET_PASSWORD_FIELD.PASSWORD)}
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
