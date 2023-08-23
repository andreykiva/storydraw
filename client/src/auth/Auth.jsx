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
	const [authMode, setAuthMode] = useState('registerOptions');

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

				{authMode === 'loginOptions' && <Login />}
				{authMode === 'registerOptions' && <Register />}
				{authMode === 'resetPassword' && <ResetPassword />}

				<div className={styles.AuthModalFooter}>
					{authMode === 'loginOptions' ? (
						<>
							Don't have an account?
							<span className={styles.FooterBtn} onClick={handleModeChange.bind(this, 'registerOptions')}>
								Sign up
							</span>
						</>
					) : (
						<>
							Already have an account?
							<span className={styles.FooterBtn} onClick={handleModeChange.bind(this, 'loginOptions')}>
								Log in
							</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Auth;
