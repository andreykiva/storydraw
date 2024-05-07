import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Auth.module.css';
import Login from './Login/Login';
import Register from './Register/Register';
import { closeAuthModal } from '@/features/auth/authSlice';
import ModalOverlay from '@/components/ui/ModalOverlay/ModalOverlay';
import CloseButton from '@/components/ui/buttons/CloseButton/CloseButton';

type AuthMode = 'login' | 'register';

const Auth = () => {
	const dispatch = useDispatch();
	const [authMode, setAuthMode] = useState<AuthMode>('login');

	const handleChangeMode = (newMode: AuthMode) => {
		setAuthMode(newMode);
	};

	const handleClose = () => {
		dispatch(closeAuthModal());
	};

	return (
		<ModalOverlay>
			<div className={styles.AuthModal}>
				<CloseButton className={styles.CloseBtn} onClick={handleClose} />
				
				{authMode === 'login' && <Login />}
				{authMode === 'register' && <Register />}

				{authMode === 'login' ? (
					<div className={styles.AuthModalFooter}>
						Don't have an account?
						<span className={styles.FooterBtn} onClick={handleChangeMode.bind(this, 'register')}>
							Sign up
						</span>
					</div>
				) : (
					<div className={styles.AuthModalFooter}>
						Already have an account?
						<span className={styles.FooterBtn} onClick={handleChangeMode.bind(this, 'login')}>
							Log in
						</span>
					</div>
				)}
			</div>
		</ModalOverlay>
	);
};

export default Auth;
