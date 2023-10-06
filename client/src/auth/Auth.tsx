import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Auth.module.css';
import Login from './Login/Login';
import Register from './Register/Register';
import closeImg from '@/assets/icons/close.svg';
import { closeAuthModal } from '@/features/auth/authSlice';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';

type AuthMode = 'login' | 'register';

const Auth = () => {
	const dispatch = useDispatch();
	const [authMode, setAuthMode] = useState<AuthMode>('login');

	const handleModeChange = (newMode: AuthMode) => {
		setAuthMode(newMode);
	};

	const handleModalClose = () => {
		dispatch(closeAuthModal());
	};

	return (
		<div className={styles.Auth}>
			<div className={styles.AuthModal}>
				<RoundButton className={styles.CloseBtn} onClick={handleModalClose}>
					<img src={closeImg} alt="CLose" className={styles.CloseIcon} />
				</RoundButton>

				{authMode === 'login' && <Login />}
				{authMode === 'register' && <Register />}

				{authMode === 'login' ? (
					<div className={styles.AuthModalFooter}>
						Don't have an account?
						<span className={styles.FooterBtn} onClick={handleModeChange.bind(this, 'register')}>
							Sign up
						</span>
					</div>
				) : (
					<div className={styles.AuthModalFooter}>
						Already have an account?
						<span className={styles.FooterBtn} onClick={handleModeChange.bind(this, 'login')}>
							Log in
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default Auth;
