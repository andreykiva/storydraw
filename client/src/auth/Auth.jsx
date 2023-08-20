import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Auth.module.css';
import Login from './Login/Login';
import Register from './Register/Register';
import ResetPassword from './ResetPassword/ResetPassword';
import closeImg from '../assets/icons/close.svg';
import { closeAuth } from '../features/auth/authSlice';

const Auth = () => {
	const dispatch = useDispatch();
	const [authMode, setAuthMode] = useState('register');

	const handleModeChange = (newMode) => {
		setAuthMode(newMode);
	};

	const handleModalClose = () => {
		dispatch(closeAuth());
	};

	return (
		<div className={styles.Auth}>
			<div className={styles.AuthModal}>
				<button className={styles.CloseBtn} onClick={handleModalClose}>
					<img src={closeImg} alt="CLose" className={styles.CloseIcon} />
				</button>
				{authMode === 'login' && <Login handleModeChange />}
				{authMode === 'register' && <Register handleModeChange />}
				{authMode === 'resetPassword' && <ResetPassword handleModeChange />}
			</div>
		</div>
	);
};

export default Auth;
