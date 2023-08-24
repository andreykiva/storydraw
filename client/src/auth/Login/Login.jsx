import React, { useState } from 'react';
import styles from './Login.module.css';
import LoginOptions from './LoginOptions/LoginOptions';
import LoginForm from './LoginForm/LoginForm';
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm';
import LoginWithQR from './LoginWithQR/LoginWithQR';
import ArrowIcon from '../../components/UI/icons/ArrowIcon';
import RoundButton from '../../components/UI/RoundButton/RoundButton';

const Login = () => {
	const [displayMode, setDisplayMode] = useState('options');

	return (
		<div className={styles.Login}>
			{displayMode !== 'options' && (
				<RoundButton className={styles.BackBtn} onClick={setDisplayMode.bind(this, 'options')}>
					<ArrowIcon className={styles.BackIcon} />
				</RoundButton>
			)}

			{displayMode === 'options' && (
				<LoginOptions
					openForm={setDisplayMode.bind(this, 'form')}
					openQRCode={setDisplayMode.bind(this, 'qrcode')}
				/>
			)}
			{displayMode === 'form' && <LoginForm openReset={setDisplayMode.bind(this, 'reset')} />}
			{displayMode === 'reset' && <ResetPasswordForm />}
			{displayMode === 'qrcode' && <LoginWithQR />}
		</div>
	);
};

export default Login;
