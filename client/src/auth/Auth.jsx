import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Auth.module.css';
import Login from './Login/Login';
import Register from './Register/Register';
import closeImg from '../assets/icons/close.svg';
import { closeAuth } from '../features/auth/authSlice';
import RoundButton from '../components/UI/RoundButton/RoundButton';

const Auth = () => {
	const dispatch = useDispatch();
	const [displayMode, setDisplayMode] = useState('login');

	const handleModeChange = (newMode) => {
		setDisplayMode(newMode);
	};

	const handleModalClose = () => {
		dispatch(closeAuth());
	};

	return (
		<div className={styles.Auth}>
			<div className={styles.AuthModal}>
				<RoundButton className={styles.CloseBtn} onClick={handleModalClose}>
					<img src={closeImg} alt="CLose" className={styles.CloseIcon} />
				</RoundButton>

				{displayMode === 'login' && <Login />}
				{displayMode === 'register' && <Register />}

				<div className={styles.AuthModalFooter}>
					{displayMode === 'login' ? (
						<>
							Don't have an account?
							<span className={styles.FooterBtn} onClick={handleModeChange.bind(this, 'register')}>
								Sign up
							</span>
						</>
					) : (
						<>
							Already have an account?
							<span className={styles.FooterBtn} onClick={handleModeChange.bind(this, 'login')}>
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
