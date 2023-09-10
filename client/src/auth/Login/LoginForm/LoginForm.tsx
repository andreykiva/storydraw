import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import HTag from '@/components/ui/HTag/HTag';
import WithLogin from './WithLogin/WIthLogin';
import WithPhone from './WithPhone/WithPhone';

type LoginFormProps = {
	openReset: () => void;
};

const LoginForm = ({ openReset }: LoginFormProps) => {
	const [loginMethod, setLoginMethod] = useState('phone');

	return (
		<div className={styles.LoginForm}>
			<HTag tag="h2" className={styles.Title}>
				Log in
			</HTag>
			{loginMethod === 'login' && (
				<WithLogin openReset={openReset} openWithPhone={setLoginMethod.bind(this, 'phone')} />
			)}
			{loginMethod === 'phone' && (
				<WithPhone openReset={openReset} openWithLogin={setLoginMethod.bind(this, 'login')} />
			)}
		</div>
	);
};

export default LoginForm;
