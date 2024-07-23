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
import ValidatedInput from '@/components/ui/inputs/ValidatedInput/ValidatedInput';

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
		isFormBtnDisabled,
		isUsernameBtnDisabled,
		isCodeBtnDisabled,
		isFormBtnLoading,
		isCodeBtnLoading,
		isUsernameInputLoading,
		isUsernameBtnLoading,
		handleChangeInput,
		handleBlurInput,
		handleChangeCountry,
		handleToggleSendTrends,
		handleChangeBirth,
		handleChangeIsPhoneMode,
		handleChangeShowUsernameField,
		handleSubmit,
		handleSendCode,
		handleSubmitUsername,
		handleSkip,
		handleFindUser,
	} = useRegisterForm();

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
			{!showUsernameField ? (
				<form onSubmit={handleSubmit}>
					<BirthdaySelector
						selectBirthday={handleChangeBirth}
						selectedMonth={birthData[BIRTH_FIELD.MONTH]}
						selectedDay={birthData[BIRTH_FIELD.DAY]}
						selectedYear={birthData[BIRTH_FIELD.YEAR]}
					/>
					<FormHeader
						isPhoneMode={isPhoneMode}
						onEnablePhoneMode={() => handleChangeIsPhoneMode(true)}
						onDisablePhoneMode={() => handleChangeIsPhoneMode(false)}
					/>
					{isPhoneMode ? (
						<div className={authSharedStyles.PhoneField}>
							<CountrySelector selectedOption={country} selectOption={handleChangeCountry} showPhonePrefix={true} />
							<Input
								type="text"
								name={REGISTER_FIELD.PHONE}
								mode={INPUT_MODE.PHONE}
								placeholder="Phone number"
								value={formData[REGISTER_FIELD.PHONE]}
								error={formErrors[REGISTER_FIELD.PHONE]}
								onChange={handleChangeInput}
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
								onBlur={() => handleBlurInput(REGISTER_FIELD.EMAIL)}
								required
							/>
							<PasswordInput
								name={REGISTER_FIELD.PASSWORD}
								placeholder="Password"
								value={formData[REGISTER_FIELD.PASSWORD]}
								error={formErrors[REGISTER_FIELD.PASSWORD]}
								onChange={handleChangeInput}
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
						onBlur={() => handleBlurInput(REGISTER_FIELD.CODE)}
						onSendCode={handleSendCode}
						disabled={isCodeBtnDisabled}
						loading={isCodeBtnLoading}
						isOtherErrors={isPhoneMode ? !!formErrors[REGISTER_FIELD.PHONE] : !!formErrors[REGISTER_FIELD.EMAIL]}
						required
					/>
					{!isPhoneMode && (
						<Checkbox checked={sendTrends} onChange={handleToggleSendTrends}>
							Get trending content, newsletters, promotions, recommendations, and account updates sent to your email
						</Checkbox>
					)}
					<Button className={authSharedStyles.SubmitBtn} type="submit" disabled={isFormBtnDisabled} loading={isFormBtnLoading}>
						Sign up
					</Button>
				</form>
			) : (
				<form onSubmit={handleSubmitUsername}>
					<span className={authSharedStyles.CreateUsernameTitle}>Create username</span>
					<ValidatedInput
						type="text"
						name={REGISTER_FIELD.USERNAME}
						placeholder="Username"
						value={formData[REGISTER_FIELD.USERNAME]}
						error={formErrors[REGISTER_FIELD.USERNAME]}
						loading={isUsernameInputLoading}
						onChange={handleChangeInput}
						request={handleFindUser}
					/>
					<span className={authSharedStyles.CreateUsernameDescr}>You can always change this later.</span>
					<Button
						className={authSharedStyles.SubmitBtn}
						type="submit"
						disabled={isUsernameBtnDisabled}
						loading={isUsernameBtnLoading}
					>
						Create
					</Button>
					<Button className={authSharedStyles.SkipBtn} onClick={handleSkip}>
						Skip
					</Button>
				</form>
			)}
		</>
	);
};

export default RegisterForm;
