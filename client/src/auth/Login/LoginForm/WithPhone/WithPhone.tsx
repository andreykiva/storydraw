import React, { useState } from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
import Input from '@/components/ui/inputs/Input/Input';
import PasswordInput from '@/components/ui/inputs/PasswordInput/PasswordInput';
import CodeInput from '@/components/ui/inputs/CodeInput/CodeInput';
import Button from '@/components/ui/buttons/Button/Button';
import { validatePhone, validatePassword, validateCode } from '@/utils/validators';
import Select from '@/components/ui/Select/Select';
import countries from '@/data/countries';

type WithPhoneProps = {
	openReset: () => void;
	openWithLogin: () => void;
};

const WithPhone = ({ openReset, openWithLogin }: WithPhoneProps) => {
	const [formData, setFormData] = useState({
		phone: '',
		code: '',
		password: '',
	});

	const [formErrors, setFormErrors] = useState({
		phone: '',
		code: '',
		password: '',
	});

	const [isPasswordMode, setIsPasswordMode] = useState(false);

	const isFormBtnDisabled = Boolean(
		validatePhone(formData.phone) ||
			(isPasswordMode ? validatePassword(formData.password) : validateCode(formData.code)),
	);

	const isCodeBtnDisabled = Boolean(validatePhone(formData.phone));

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

	// const handleSelectChange = (selectedValue: string) => {
	// 	console.log('Selected value:', selectedValue);
	// };

	return (
		<form onSubmit={handleSubmit}>
			<div className={authSharedStyles.FormHeader}>
				<span className={authSharedStyles.HeaderTitle}>Phone number</span>
				<span className={authSharedStyles.HeaderBtn} onClick={openWithLogin}>
					Log in with email or username
				</span>
			</div>
			<div className={authSharedStyles.Select}>
				<Select options={countries} defaultOption={countries[0]} />
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
			{isPasswordMode ? (
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
			) : (
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
			)}
			<div className={authSharedStyles.Footer}>
				{isPasswordMode ? (
					<>
						<span className={authSharedStyles.FooterBtn} onClick={openReset}>
							Forgot password?
						</span>
						<span className={authSharedStyles.FooterDivider}></span>
						<span className={authSharedStyles.FooterBtn} onClick={setIsPasswordMode.bind(this, false)}>
							Log in with code
						</span>
					</>
				) : (
					<span className={authSharedStyles.FooterBtn} onClick={setIsPasswordMode.bind(this, true)}>
						Log in with password
					</span>
				)}
			</div>
			<Button className={authSharedStyles.LoginBtn} type="submit" disabled={isFormBtnDisabled}>
				Log in
			</Button>
		</form>
	);
};

export default WithPhone;
