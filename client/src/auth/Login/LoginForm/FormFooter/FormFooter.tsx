import React from 'react';
import styles from './FormFooter.module.css';

type LoginMethod = 'loginAndPassword' | 'phoneAndCode' | 'phoneAndPassword';

type FormFooterProps = {
	loginMethod: LoginMethod;
	openResetForm: () => void;
	setLoginMethod: (loginMethod: LoginMethod) => void;
};

const FormFooter = ({ loginMethod, openResetForm, setLoginMethod }: FormFooterProps) => {
	const isPhoneAndPassword = loginMethod === 'phoneAndPassword';
	const isPhoneAndCode = loginMethod === 'phoneAndCode';

	return (
		<div className={styles.FormFooter}>
			{loginMethod !== 'phoneAndCode' && (
				<span className={styles.FooterBtn} onClick={openResetForm}>
					Forgot password?
				</span>
			)}
			{isPhoneAndPassword && (
				<>
					<span className={styles.FooterDivider}></span>
					<span className={styles.FooterBtn} onClick={setLoginMethod.bind(this, 'phoneAndCode')}>
						Log in with code
					</span>
				</>
			)}
			{isPhoneAndCode && (
				<span className={styles.FooterBtn} onClick={setLoginMethod.bind(this, 'phoneAndPassword')}>
					Log in with password
				</span>
			)}
		</div>
	);
};

export default FormFooter;
