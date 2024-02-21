import React, { useState } from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
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
	handleInputFocus: (fieldName: string) => void;
	handleInputBlur: (fieldName: string) => void;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSelectChange: (selectedCountry: Country) => void;
	handleCheckboxChange: () => void;
	handleBirthdayChange: (fieldName: string, selectedDate: string) => void;
	showRegisterOptions: () => void;
};

const RegisterForm = (props: RegisterFormProps) => {
	const {
		formData,
		formErrors,
		handleInputFocus,
		handleInputBlur,
		handleInputChange,
		handleSelectChange,
		handleCheckboxChange,
		handleBirthdayChange,
		showRegisterOptions,
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
				onClick={showUsernameField ? setShowUsernameField.bind(this, false) : showRegisterOptions}
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
							selectBirthday={handleBirthdayChange}
							selectedMonth={formData.birthMonth}
							selectedDay={formData.birthDay}
							selectedYear={formData.birthYear}
						/>
						<FormHeader
							isPhoneMode={isPhoneMode}
							enablePhoneMode={setIsPhoneMode.bind(this, true)}
							disablePhoneMode={setIsPhoneMode.bind(this, false)}
						/>
						{isPhoneMode ? (
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
						) : (
							<>
								<Input
									type="text"
									name="email"
									mode="Email"
									placeholder="Email address"
									value={formData.email}
									error={formErrors.email}
									onChange={handleInputChange}
									onFocus={handleInputFocus.bind(this, 'email')}
									onBlur={handleInputBlur.bind(this, 'email')}
									required
								/>
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
							</>
						)}
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
						{!isPhoneMode && (
							<Checkbox checked={formData.sendTrends} onChange={handleCheckboxChange}>
								Get trending content, newsletters, promotions, recommendations, and account updates sent
								to your email
							</Checkbox>
						)}
						<Button
							className={authSharedStyles.SubmitBtn}
							disabled={isFormBtnDisabled}
							onClick={setShowUsernameField.bind(this, true)}
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
							onChange={handleInputChange}
							onFocus={handleInputFocus.bind(this, 'username')}
							onBlur={handleInputBlur.bind(this, 'username')}
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
