import React, { useState } from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
import Input from '@/components/ui/inputs/Input/Input';
import PasswordInput from '@/components/ui/inputs/PasswordInput/PasswordInput';
import CodeInput from '@/components/ui/inputs/CodeInput/CodeInput';
import Button from '@/components/ui/buttons/Button/Button';
import { validatePhone, validatePassword, validateCode, validateEmail } from '@/utils/validators';
import CountrySelector from '@/components/CountrySelector/CountrySelector';
import HTag from '@/components/ui/HTag/HTag';
import countries from '@/data/countries';
import type Country from '@/types/Country';

const ResetPasswordForm = () => {
	const [formData, setFormData] = useState({
		phone: '',
		email: '',
		code: '',
		password: '',
		country: countries[0],
	});

	const [formErrors, setFormErrors] = useState({
		phone: '',
		email: '',
		code: '',
		password: '',
	});

	const [isPhoneMode, setIsPhoneMode] = useState(false);

	const isFormBtnDisabled = Boolean(
		validatePassword(formData.password) ||
			validateCode(formData.code) ||
			(isPhoneMode ? validatePhone(formData.phone) : validateEmail(formData.email)),
	);

	const isCodeBtnDisabled = Boolean(isPhoneMode ? validatePhone(formData.phone) : validateEmail(formData.email));

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Submit');
	};

	const handleInputFocus = (fieldName: string) => {
		setFormErrors({
			...formErrors,
			[fieldName]: '',
		});
	};

	const handleInputBlur = (fieldName: string) => {
		if (fieldName === 'phone' && formData.phone) {
			const phoneError = validatePhone(formData.phone);
			setFormErrors({
				...formErrors,
				phone: phoneError || '',
			});
		} else if (fieldName === 'email' && formData.email) {
			const emailError = validateEmail(formData.email);
			setFormErrors({
				...formErrors,
				email: emailError || '',
			});
		} else if (fieldName === 'password' && formData.password) {
			const passwordError = validatePassword(formData.password);
			setFormErrors({
				...formErrors,
				password: passwordError || '',
			});
		} else if (fieldName === 'code' && formData.code) {
			const codeError = validateCode(formData.code);
			setFormErrors({
				...formErrors,
				code: codeError || '',
			});
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSelectChange = (selectedCountry: Country) => {
		setFormData({
			...formData,
			country: selectedCountry,
		});
	};

	return (
		<div>
			<HTag tag="h2" className={authSharedStyles.Title}>
				Reset password
			</HTag>
			<form onSubmit={handleSubmit}>
				<div className={authSharedStyles.FormHeader}>
					<span className={authSharedStyles.HeaderTitle}>
						{isPhoneMode ? 'Enter phone number' : 'Enter email address'}
					</span>
					{isPhoneMode ? (
						<span className={authSharedStyles.HeaderBtn} onClick={setIsPhoneMode.bind(this, false)}>
							Reset with email
						</span>
					) : (
						<span className={authSharedStyles.HeaderBtn} onClick={setIsPhoneMode.bind(this, true)}>
							Reset with phone number
						</span>
					)}
				</div>
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
				<Button className={authSharedStyles.SubmitBtn} type="submit" disabled={isFormBtnDisabled}>
					Log in
				</Button>
			</form>
		</div>
	);
};

export default ResetPasswordForm;
