import React, { useState } from 'react';
import styles from './WithLogin.module.css';
import formStyles from '@/auth/FormStyles.module.css';
import Button from '@/components/ui/Button/Button';

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

	// const [showPassword, setShowPassword] = useState(false);

	// const handleTogglePassword = () => {
	// 	setShowPassword(!showPassword);
	// };

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	return (
		<form className={styles.WithLogin}>
			<div className={formStyles.FormHeader}>
				<span className={formStyles.HeaderTitle}>Enter email or username</span>
				<span className={formStyles.HeaderBtn} onClick={openWithPhone}>
					Log in with phone
				</span>
			</div>
			<div className={formStyles.FormGroup}>
				<input
					className={formStyles.Input}
					type="text"
					name="login"
					placeholder="Email or username"
					value={formData.login}
					onChange={handleInputChange}
					required
				/>
				{formErrors.login && <span className={formStyles.InputError}>Error</span>}
			</div>
			<div className={formStyles.FormGroup}>
				<input
					className={formStyles.Input}
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					onChange={handleInputChange}
					required
				/>
				{formErrors.password && <span className={formStyles.InputError}>Wrong password</span>}
			</div>
			<span className={formStyles.FooterBtn} onClick={openReset}>
				Forgot password?
			</span>
			<Button className={formStyles.LoginBtn}>Log in</Button>
		</form>
	);
};

export default WithLogin;
