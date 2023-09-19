import React from 'react';
import styles from './FormFooter.module.css';

type LoginMethod = 'loginAndPassword' | 'phoneAndCode' | 'phoneAndPassword';

type FormFooterProps = {
	loginMethod: LoginMethod;
	openReset: () => void;
	setLoginMethod: (loginMethod: LoginMethod) => void;
};

const FormFooter = ({ loginMethod, openReset, setLoginMethod }: FormFooterProps) => {
	return (
		<div className={styles.FormFooter}>
			{loginMethod !== 'phoneAndCode' && (
				<span className={styles.FooterBtn} onClick={openReset}>
					Forgot password?
				</span>
			)}
			{loginMethod === 'phoneAndPassword' && (
				<>
					<span className={styles.FooterDivider}></span>
					<span className={styles.FooterBtn} onClick={setLoginMethod.bind(this, 'phoneAndCode')}>
						Log in with code
					</span>
				</>
			)}
			{loginMethod === 'phoneAndCode' && (
				<span className={styles.FooterBtn} onClick={setLoginMethod.bind(this, 'phoneAndPassword')}>
					Log in with password
				</span>
			)}
		</div>
	);
};

export default FormFooter;
