import React, { useState } from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
import Input from '@/components/ui/inputs/Input/Input';
import PasswordInput from '@/components/ui/inputs/PasswordInput/PasswordInput';
import Button from '@/components/ui/buttons/Button/Button';
import { validateLogin, validatePassword } from '@/utils/validators';

type WithLoginProps = {
	openReset: () => void;
	openWithPhone: () => void;
};

const WithLogin = ({ openReset, openWithPhone }: WithLoginProps) => {
	const [formData, setFormData] = useState({
		login: '',
		password: '',
	});

	const [formErrors, setFormErrors] = useState({
		login: '',
		password: '',
	});

	const isFormBtnDisabled = Boolean(validateLogin(formData.login) || validatePassword(formData.password));

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
		if (fieldName === 'login' && formData.login) {
			const loginError = validateLogin(formData.login);
			setFormErrors({
				...formErrors,
				login: loginError || '',
			});
		} else if (fieldName === 'password' && formData.password) {
			const passwordError = validatePassword(formData.password);
			setFormErrors({
				...formErrors,
				password: passwordError || '',
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

	return (
		<form onSubmit={handleSubmit}>
			<div className={authSharedStyles.FormHeader}>
				<span className={authSharedStyles.HeaderTitle}>Email or username</span>
				<span className={authSharedStyles.HeaderBtn} onClick={openWithPhone}>
					Log in with phone
				</span>
			</div>
			<Input
				type="text"
				name="login"
				placeholder="Email or username"
				value={formData.login}
				error={formErrors.login}
				onChange={handleInputChange}
				onFocus={handleInputFocus.bind(this, 'login')}
				onBlur={handleInputBlur.bind(this, 'login')}
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
			<div className={authSharedStyles.Footer}>
				<span className={authSharedStyles.FooterBtn} onClick={openReset}>
					Forgot password?
				</span>
			</div>
			<Button className={authSharedStyles.LoginBtn} type="submit" disabled={isFormBtnDisabled}>
				Log in
			</Button>
		</form>
	);
};

export default WithLogin;
