import React from 'react';
import styles from './FormFooter.module.css';

type LoginMethod = 'loginAndPassword' | 'phoneAndCode' | 'phoneAndPassword';

type FormFooterProps = {
	loginMethod: LoginMethod;
	onOpenResetForm: () => void;
	onChangeLoginMethod: (loginMethod: LoginMethod) => void;
};

const FormFooter = ({ loginMethod, onOpenResetForm, onChangeLoginMethod }: FormFooterProps) => {
	const isPhoneAndPassword = loginMethod === 'phoneAndPassword';
	const isPhoneAndCode = loginMethod === 'phoneAndCode';

	return (
		<div className={styles.FormFooter}>
			{loginMethod !== 'phoneAndCode' && (
				<span className={styles.FooterBtn} onClick={onOpenResetForm}>
					Forgot password?
				</span>
			)}
			{isPhoneAndPassword && (
				<>
					<span className={styles.FooterDivider}></span>
					<span className={styles.FooterBtn} onClick={onChangeLoginMethod.bind(this, 'phoneAndCode')}>
						Log in with code
					</span>
				</>
			)}
			{isPhoneAndCode && (
				<span className={styles.FooterBtn} onClick={onChangeLoginMethod.bind(this, 'phoneAndPassword')}>
					Log in with password
				</span>
			)}
		</div>
	);
};

export default FormFooter;
