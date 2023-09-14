import React, { useState } from 'react';
import styles from './WithLogin.module.css';
import formStyles from '@/auth/FormStyles.module.css';
import Button from '@/components/ui/Button/Button';
import { validateLogin, validatePassword } from '@/utils/validators';
import warningImg from '@/assets/icons/auth/warning.svg';
import eyeOpenedImg from '@/assets/icons/auth/eye-opened.svg';
import eyeClosedImg from '@/assets/icons/auth/eye-closed.svg';

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

	const disabled = Boolean(validateLogin(formData.login) || validatePassword(formData.password));

	const [showPassword, setShowPassword] = useState(false);

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

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
		<form className={styles.WithLogin} onSubmit={handleSubmit}>
			<div className={formStyles.FormHeader}>
				<span className={formStyles.HeaderTitle}>Enter email or username</span>
				<span className={formStyles.HeaderBtn} onClick={openWithPhone}>
					Log in with phone
				</span>
			</div>
			<div className={[formStyles.FormGroup, formErrors.login && formStyles.GroupError].join(' ')}>
				<div className={formStyles.InputIcons}>
					<img src={warningImg} alt="Warning" className={formStyles.WarningIcon} />
				</div>
				<input
					className={formStyles.Input}
					type="text"
					name="login"
					placeholder="Email or username"
					value={formData.login}
					onChange={handleInputChange}
					onFocus={handleInputFocus.bind(this, 'login')}
					onBlur={handleInputBlur.bind(this, 'login')}
					required
				/>
				{formErrors.login && <p className={formStyles.InputError}>{formErrors.login}</p>}
			</div>
			<div className={[formStyles.FormGroup, formErrors.password && formStyles.GroupError].join(' ')}>
				<div className={formStyles.InputIcons}>
					<img src={warningImg} alt="Warning" className={formStyles.WarningIcon} />
					<img
						src={showPassword ? eyeOpenedImg : eyeClosedImg}
						alt="Eye"
						className={formStyles.ShowPasswordIcon}
						onClick={handleTogglePassword}
					/>
				</div>
				<input
					className={formStyles.Input}
					type={showPassword ? 'text' : 'password'}
					name="password"
					placeholder="Password"
					value={formData.password}
					onChange={handleInputChange}
					onFocus={handleInputFocus.bind(this, 'password')}
					onBlur={handleInputBlur.bind(this, 'password')}
					required
				/>
				{formErrors.password && <p className={formStyles.InputError}>{formErrors.password}</p>}
			</div>
			<span className={formStyles.FooterBtn} onClick={openReset}>
				Forgot password?
			</span>
			<Button className={formStyles.LoginBtn} type="submit" disabled={disabled}>
				Log in
			</Button>
		</form>
	);
};

export default WithLogin;
