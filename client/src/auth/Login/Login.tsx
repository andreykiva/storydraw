import React, { useState } from 'react';
import styles from './Login.module.css';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
import LoginOptions from './LoginOptions/LoginOptions';
import LoginForm from './LoginForm/LoginForm';
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm';
import LoginWithQR from './LoginWithQR/LoginWithQR';
import ArrowIcon from '@/components/ui/icons/ArrowIcon';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';

const Login = () => {
	const [loginView, setLoginView] = useState('form');

	return (
		<div className={styles.Login}>
			{loginView !== 'options' && (
				<RoundButton
					className={authSharedStyles.BackBtn}
					onClick={setLoginView.bind(this, loginView === 'reset' ? 'form' : 'options')}
				>
					<ArrowIcon className={authSharedStyles.BackIcon} />
				</RoundButton>
			)}

			{loginView === 'options' && (
				<LoginOptions
					openForm={setLoginView.bind(this, 'form')}
					openQRCode={setLoginView.bind(this, 'qrcode')}
				/>
			)}
			{loginView === 'form' && <LoginForm openReset={setLoginView.bind(this, 'reset')} />}
			{loginView === 'reset' && <ResetPasswordForm />}
			{loginView === 'qrcode' && <LoginWithQR />}
		</div>
	);
};

export default Login;
