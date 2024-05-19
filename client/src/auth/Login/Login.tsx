import React, { useState } from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import LoginOptions from './LoginOptions/LoginOptions';
import LoginWithQR from './LoginWithQR/LoginWithQR';
import ArrowIcon from '@/assets/icons/arrow.svg';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import AuthContainer from '@/auth/AuthContainer/AuthContainer';

type LoginView = 'loginOptions' | 'loginForm' | 'resetForm' | 'qrcode';

const Login = () => {
	const [loginView, setLoginView] = useState<LoginView>('loginOptions');

	return (
		<div className={authSharedStyles.AuthInner}>
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
