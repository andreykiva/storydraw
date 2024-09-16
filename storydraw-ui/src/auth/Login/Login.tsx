import { useState } from 'react';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import LoginOptions from './LoginOptions/LoginOptions';
import LoginWithQR from './LoginWithQR/LoginWithQR';
import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow.svg';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import LoginForm from './LoginForm/LoginForm';
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm';

const enum LOGIN_VIEW {
	LOGIN_OPTIONS = 'loginOptions',
	LOGIN_FORM = 'loginForm',
	RESET_FORM = 'resetForm',
	QRCODE = 'qrcode',
}

const Login = () => {
	const [loginView, setLoginView] = useState<LOGIN_VIEW>(LOGIN_VIEW.LOGIN_OPTIONS);

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
					openForm={() => setLoginView(LOGIN_VIEW.LOGIN_FORM)}
					openQRCode={() => setLoginView(LOGIN_VIEW.QRCODE)}
				/>
			)}
			{loginView === LOGIN_VIEW.LOGIN_FORM && (
				<LoginForm onOpenResetForm={() => setLoginView(LOGIN_VIEW.RESET_FORM)} />
			)}
			{loginView === LOGIN_VIEW.RESET_FORM && <ResetPasswordForm />}
			{loginView === LOGIN_VIEW.QRCODE && <LoginWithQR />}
		</div>
	);
};

export default Login;
