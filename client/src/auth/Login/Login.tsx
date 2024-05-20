import React, { useState } from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import LoginOptions from './LoginOptions/LoginOptions';
import LoginWithQR from './LoginWithQR/LoginWithQR';
import ArrowIcon from '@/assets/icons/arrow.svg';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import AuthContainer from '@/auth/AuthContainer/AuthContainer';

const enum LOGIN_VIEW {
	LOGIN_OPTIONS = 'loginOptions',
	LOGIN_FORM = 'loginForm',
	RESET_FORM = 'resetForm',
	QRCODE = 'qrcode',
}

type LoginView = (typeof LOGIN_VIEW)[keyof typeof LOGIN_VIEW];

const Login = () => {
	const [loginView, setLoginView] = useState<LoginView>(LOGIN_VIEW.LOGIN_OPTIONS);

	return (
		<div className={authSharedStyles.AuthInner}>
			{loginView !== LOGIN_VIEW.LOGIN_OPTIONS && (
				<RoundButton
					className={authSharedStyles.BackBtn}
					onClick={setLoginView.bind(
						this,
						loginView === LOGIN_VIEW.RESET_FORM ? LOGIN_VIEW.LOGIN_FORM : LOGIN_VIEW.LOGIN_OPTIONS,
					)}
				>
					<ArrowIcon className={authSharedStyles.BackIcon} />
				</RoundButton>
			)}
			{loginView === LOGIN_VIEW.LOGIN_OPTIONS && (
				<LoginOptions
					openForm={setLoginView.bind(this, LOGIN_VIEW.LOGIN_FORM)}
					openQRCode={setLoginView.bind(this, LOGIN_VIEW.QRCODE)}
				/>
			)}
			{loginView === LOGIN_VIEW.LOGIN_FORM && (
				<AuthContainer authMode='login' openResetForm={setLoginView.bind(this, LOGIN_VIEW.RESET_FORM)} />
			)}
			{loginView === LOGIN_VIEW.RESET_FORM && <AuthContainer authMode='reset' />}
			{loginView === LOGIN_VIEW.QRCODE && <LoginWithQR />}
		</div>
	);
};

export default Login;
