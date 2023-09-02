import React, { useState } from 'react';
import styles from './WithPhone.module.css';
import formStyles from '../../../FormStyles.module.css';
import Button from '../../../../components/UI/Button/Button';

const WithPhone = ({ openReset, openWithLogin }) => {
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

	const [showPassword, setShowPassword] = useState(false);

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	return (
		<form className={styles.WithPhone}>
			<div className={formStyles.FormHeader}>
				<span className={formStyles.HeaderTitle}>Enter phone number</span>
				<span className={formStyles.HeaderBtn} onClick={openWithLogin}>
					Log in with email or username
				</span>
			</div>
			<div className={formStyles.FormGroup}>
				<input
					className={formStyles.Input}
					type="text"
					name="phone"
					placeholder="Phone"
					value={formData.phone}
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

export default WithPhone;
