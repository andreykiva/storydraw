import React from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import Input from '@/components/ui/inputs/Input/Input';
import PasswordInput from '@/components/ui/inputs/PasswordInput/PasswordInput';
import CodeInput from '@/components/ui/inputs/CodeInput/CodeInput';
import Button from '@/components/ui/buttons/Button/Button';
import HTag from '@/components/ui/HTag/HTag';
import CountrySelector from '@/components/CountrySelector/CountrySelector';
import FormFooter from './FormFooter/FormFooter';
import FormHeader from './FormHeader/FormHeader';
import { LOGIN_FIELD, LOGIN_METHOD } from '@/constants/auth';
import useLoginForm from '@/hooks/forms/useLoginForm';
import { INPUT_MODE } from '@/constants/ui';

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
		isFormBtnLoading,
		isCodeBtnLoading,
		handleChangeInput,
		handleBlurInput,
		handleChangeCountry,
		handleChangeLoginMethod,
		handleSubmit,
		handleSendCode,
	} = useLoginForm();

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
						onBlur={() => handleBlurInput(LOGIN_FIELD.LOGIN)}
						required
					/>
				) : (
					<div className={authSharedStyles.PhoneField}>
						<CountrySelector selectedOption={country} selectOption={handleChangeCountry} showPhonePrefix={true} />
						<Input
							type="text"
							name={LOGIN_FIELD.PHONE}
							mode={INPUT_MODE.PHONE}
							placeholder="Phone number"
							value={formData[LOGIN_FIELD.PHONE]}
							error={formErrors[LOGIN_FIELD.PHONE]}
							onChange={handleChangeInput}
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
						isOtherErrors={!!formErrors[LOGIN_FIELD.PHONE]}
						onChange={handleChangeInput}
						onBlur={() => handleBlurInput(LOGIN_FIELD.CODE)}
						onSendCode={handleSendCode}
						loading={isCodeBtnLoading}
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
				<Button className={authSharedStyles.SubmitBtn} type="submit" disabled={isFormBtnDisabled} loading={isFormBtnLoading}>
					Log in
				</Button>
			</form>
		</>
	);
};

export default LoginForm;
