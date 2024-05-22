import React, { useState } from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import Input from '@/components/ui/inputs/Input/Input';
import PasswordInput from '@/components/ui/inputs/PasswordInput/PasswordInput';
import CodeInput from '@/components/ui/inputs/CodeInput/CodeInput';
import Button from '@/components/ui/buttons/Button/Button';
import { validatePhone, validatePassword, validateCode, validateEmail, validateUsername } from '@/utils/validators';
import CountrySelector from '@/auth/CountrySelector/CountrySelector';
import HTag from '@/components/ui/HTag/HTag';
import countries from '@/data/countries';
import type Country from '@/types/Country';
import Checkbox from '@/components/ui/inputs/Checkbox/Checkbox';
import BirthdaySelector from './BirthdaySelector/BirthdaySelector';
import type { FormData, FormErrors } from '@/types/Auth';
import FormHeader from './FormHeader/FormHeader';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import ArrowIcon from '@/assets/icons/arrow.svg';

type RegisterFormProps = {
	formData: FormData;
	formErrors: FormErrors;
	onFocusInput: (fieldName: string) => void;
	onBlurInput: (fieldName: string) => void;
	onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeSelect: (selectedCountry: Country) => void;
	onChangeCheckbox: () => void;
	onChangeBirthday: (fieldName: string, selectedDate: string) => void;
	onShowRegisterOptions: () => void;
};

const RegisterForm = (props: RegisterFormProps) => {
	const {
		formData,
		formErrors,
		onFocusInput,
		onBlurInput,
		onChangeInput,
		onChangeSelect,
		onChangeCheckbox,
		onChangeBirthday,
		onShowRegisterOptions,
	} = props;

	const [isPhoneMode, setIsPhoneMode] = useState(true);
	const [showUsernameField, setShowUsernameField] = useState(false);

	// isFormBtnDisabled
	const isBirthDateIncomplete = !formData.birthMonth || !formData.birthDay || !formData.birthYear;
	const isInvalidCode = validateCode(formData.code);
	const isInvalidPhoneOrEmailOrPassword = isPhoneMode
		? validatePhone(formData.phone)
		: validateEmail(formData.email) || validatePassword(formData.password);

	const isFormBtnDisabled = Boolean(isBirthDateIncomplete || isInvalidCode || isInvalidPhoneOrEmailOrPassword);

	//isCodeBtnDisabled
	const isCodeBtnDisabled = Boolean(isPhoneMode ? validatePhone(formData.phone) : validateEmail(formData.email));

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Submit');
	};

	return (
		<>
			<RoundButton
				className={authSharedStyles.BackBtn}
				onClick={showUsernameField ? () => setShowUsernameField(false) : onShowRegisterOptions}
			>
				<ArrowIcon className={authSharedStyles.BackIcon} />
			</RoundButton>
			<HTag tag="h2" className={authSharedStyles.Title}>
				Sign up
			</HTag>
			<form onSubmit={handleSubmit}>
				{!showUsernameField ? (
					<>
						<BirthdaySelector
							selectBirthday={onChangeBirthday}
							selectedMonth={formData.birthMonth}
							selectedDay={formData.birthDay}
							selectedYear={formData.birthYear}
						/>
						<FormHeader
							isPhoneMode={isPhoneMode}
							onEnablePhoneMode={() => setIsPhoneMode(true)}
							onDisablePhoneMode={() => setIsPhoneMode(false)}
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
									onFocus={() => onFocusInput('phone')}
									onBlur={() => onBlurInput('phone')}
									required
								/>
							</div>
						) : (
							<>
								<Input
									type="text"
									name="email"
									mode="Email"
									placeholder="Email address"
									value={formData.email}
									error={formErrors.email}
									onChange={onChangeInput}
									onFocus={() => onFocusInput('email')}
									onBlur={() => onBlurInput('email')}
									required
								/>
								<PasswordInput
									name="password"
									placeholder="Password"
									value={formData.password}
									error={formErrors.password}
									onChange={onChangeInput}
									onFocus={() => onFocusInput('password')}
									onBlur={() => onBlurInput('password')}
									required
								/>
							</>
						)}
						<CodeInput
							name="code"
							placeholder="Enter 6-digit code"
							value={formData.code}
							error={formErrors.code}
							onChange={onChangeInput}
							onFocus={() => onFocusInput('code')}
							onBlur={() => onBlurInput('code')}
							disabled={isCodeBtnDisabled}
							required
						/>
						{!isPhoneMode && (
							<Checkbox checked={formData.sendTrends} onChange={onChangeCheckbox}>
								Get trending content, newsletters, promotions, recommendations, and account updates sent
								to your email
							</Checkbox>
						)}
						<Button
							className={authSharedStyles.SubmitBtn}
							disabled={isFormBtnDisabled}
							onClick={() => setShowUsernameField(true)}
						>
							Next
						</Button>
					</>
				) : (
					<div className={authSharedStyles.CreateUsername}>
						<span className={authSharedStyles.CreateUsernameTitle}>Create username</span>
						<Input
							type="text"
							name="username"
							mode="Username"
							placeholder="Username"
							value={formData.username}
							error={formErrors.username}
							onChange={onChangeInput}
							onFocus={() => onFocusInput('username')}
							onBlur={() => onBlurInput('username')}
						/>
						<span className={authSharedStyles.CreateUsernameDescr}>You can always change this later.</span>
						<Button
							className={authSharedStyles.SubmitBtn}
							type="submit"
							disabled={Boolean(validateUsername(formData.username))}
						>
							Sign up
						</Button>
						<Button className={authSharedStyles.SkipBtn} type="submit">
							Skip
						</Button>
					</div>
				)}
			</form>
		</>
	);
};

export default RegisterForm;
