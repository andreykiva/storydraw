import React from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import Input from '@/components/ui/inputs/Input/Input';
import PasswordInput from '@/components/ui/inputs/PasswordInput/PasswordInput';
import CodeInput from '@/components/ui/inputs/CodeInput/CodeInput';
import Button from '@/components/ui/buttons/Button/Button';
import CountrySelector from '@/components/CountrySelector/CountrySelector';
import HTag from '@/components/ui/HTag/HTag';
import Checkbox from '@/components/ui/inputs/Checkbox/Checkbox';
import BirthdaySelector from './BirthdaySelector/BirthdaySelector';
import FormHeader from './FormHeader/FormHeader';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import ArrowIcon from '@/assets/icons/arrow.svg';
import { REGISTER_FIELD, BIRTH_FIELD } from '@/constants/auth';
import useRegisterForm from '@/hooks/forms/useRegisterForm';
import { INPUT_MODE } from '@/constants/ui';

type RegisterFormProps = {
	onShowRegisterOptions: () => void;
};

const RegisterForm = ({ onShowRegisterOptions }: RegisterFormProps) => {
	const {
		formData,
		formErrors,
		country,
		birthData,
		sendTrends,
		isPhoneMode,
		showUsernameField,
		isNextBtnDisabled,
		isFormBtnDisabled,
		isCodeBtnDisabled,
		handleChangeInput,
		handleFocusInput,
		handleBlurInput,
		handleChangeCountry,
		handleToggleSendTrends,
		handleChangeBirth,
		handleChangeIsPhoneMode,
		handleChangeShowUsernameField,
	} = useRegisterForm();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Submit');
	};

	return (
		<>
			<RoundButton
				className={authSharedStyles.BackBtn}
				onClick={showUsernameField ? () => handleChangeShowUsernameField(false) : onShowRegisterOptions}
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
							selectBirthday={handleChangeBirth}
							selectedMonth={birthData[BIRTH_FIELD.BIRTH_MONTH]}
							selectedDay={birthData[BIRTH_FIELD.BIRHT_DAY]}
							selectedYear={birthData[BIRTH_FIELD.BIRTH_YEAR]}
						/>
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
									name={REGISTER_FIELD.PHONE}
									mode={INPUT_MODE.PHONE}
									placeholder="Phone number"
									value={formData[REGISTER_FIELD.PHONE]}
									error={formErrors[REGISTER_FIELD.PHONE]}
									onChange={handleChangeInput}
									onFocus={() => handleFocusInput(REGISTER_FIELD.PHONE)}
									onBlur={() => handleBlurInput(REGISTER_FIELD.PHONE)}
									required
								/>
							</div>
						) : (
							<>
								<Input
									type="text"
									name={REGISTER_FIELD.EMAIL}
									placeholder="Email address"
									value={formData[REGISTER_FIELD.EMAIL]}
									error={formErrors[REGISTER_FIELD.EMAIL]}
									onChange={handleChangeInput}
									onFocus={() => handleFocusInput(REGISTER_FIELD.EMAIL)}
									onBlur={() => handleBlurInput(REGISTER_FIELD.EMAIL)}
									required
								/>
								<PasswordInput
									name={REGISTER_FIELD.PASSWORD}
									placeholder="Password"
									value={formData[REGISTER_FIELD.PASSWORD]}
									error={formErrors[REGISTER_FIELD.PASSWORD]}
									onChange={handleChangeInput}
									onFocus={() => handleFocusInput(REGISTER_FIELD.PASSWORD)}
									onBlur={() => handleBlurInput(REGISTER_FIELD.PASSWORD)}
									required
								/>
							</>
						)}
						<CodeInput
							name={REGISTER_FIELD.CODE}
							placeholder="Enter 6-digit code"
							value={formData[REGISTER_FIELD.CODE]}
							error={formErrors[REGISTER_FIELD.CODE]}
							onChange={handleChangeInput}
							onFocus={() => handleFocusInput(REGISTER_FIELD.CODE)}
							onBlur={() => handleBlurInput(REGISTER_FIELD.CODE)}
							disabled={isCodeBtnDisabled}
							required
						/>
						{!isPhoneMode && (
							<Checkbox checked={sendTrends} onChange={handleToggleSendTrends}>
								Get trending content, newsletters, promotions, recommendations, and account updates sent
								to your email
							</Checkbox>
						)}
						<Button
							className={authSharedStyles.SubmitBtn}
							disabled={isNextBtnDisabled}
							onClick={() => handleChangeShowUsernameField(true)}
						>
							Next
						</Button>
					</>
				) : (
					<div className={authSharedStyles.CreateUsername}>
						<span className={authSharedStyles.CreateUsernameTitle}>Create username</span>
						<Input
							type="text"
							name={REGISTER_FIELD.USERNAME}
							mode={INPUT_MODE.USERNAME}
							placeholder="Username"
							value={formData[REGISTER_FIELD.USERNAME]}
							error={formErrors[REGISTER_FIELD.USERNAME]}
							onChange={handleChangeInput}
							onFocus={() => handleFocusInput(REGISTER_FIELD.USERNAME)}
							onBlur={() => handleBlurInput(REGISTER_FIELD.USERNAME)}
						/>
						<span className={authSharedStyles.CreateUsernameDescr}>You can always change this later.</span>
						<Button className={authSharedStyles.SubmitBtn} type="submit" disabled={isFormBtnDisabled}>
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
