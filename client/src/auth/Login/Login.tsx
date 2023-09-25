import React, { useState } from 'react';
import styles from './Login.module.css';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
import LoginOptions from './LoginOptions/LoginOptions';
import LoginWithQR from './LoginWithQR/LoginWithQR';
import ArrowIcon from '@/components/ui/icons/ArrowIcon';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import AuthContainer from '@/auth/AuthContainer/AuthContainer';

type LoginView = 'loginOptions' | 'loginForm' | 'resetForm' | 'qrcode';

const Login = () => {
	const [loginView, setLoginView] = useState<LoginView>('loginOptions');

	return (
		<div className={styles.Login}>
			{loginView !== 'loginOptions' && (
				<RoundButton
					className={authSharedStyles.BackBtn}
					onClick={setLoginView.bind(this, loginView === 'resetForm' ? 'loginForm' : 'loginOptions')}
				>
					<ArrowIcon className={authSharedStyles.BackIcon} />
				</RoundButton>
			)}
			{loginView === 'loginOptions' && (
				<LoginOptions
					openForm={setLoginView.bind(this, 'loginForm')}
					openQRCode={setLoginView.bind(this, 'qrcode')}
				/>
			)}
			{loginView === 'loginForm' && (
				<AuthContainer authMode={loginView} openResetForm={setLoginView.bind(this, 'resetForm')} />
			)}
			{loginView === 'resetForm' && <AuthContainer authMode={loginView} />}
			{loginView === 'qrcode' && <LoginWithQR />}
		</div>
	);
};

export default Login;
