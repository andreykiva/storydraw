import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Auth.module.scss';
import Login from './Login/Login';
import Register from './Register/Register';
import { closeAuthModal } from '@/features/auth/authSlice';
import ModalOverlay from '@/components/ui/ModalOverlay/ModalOverlay';
import CloseButton from '@/components/ui/buttons/CloseButton/CloseButton';

const enum AUTH_MODE {
	LOGIN = 'login',
	REGISTER = 'register',
}

const Auth = () => {
	const dispatch = useDispatch();
	const [authMode, setAuthMode] = useState<AUTH_MODE>(AUTH_MODE.LOGIN);

	const handleClose = () => {
		dispatch(closeAuthModal());
	};

	return (
		<ModalOverlay>
			<div className={styles.AuthModal}>
				<CloseButton className={styles.CloseBtn} onClick={handleClose} />

				{authMode === AUTH_MODE.LOGIN && <Login />}
				{authMode === AUTH_MODE.REGISTER && <Register />}

				{authMode === AUTH_MODE.LOGIN ? (
					<div className={styles.AuthModalFooter}>
						Don't have an account?
						<span className={styles.FooterBtn} onClick={() => setAuthMode(AUTH_MODE.REGISTER)}>
							Sign up
						</span>
					</div>
				) : (
					<div className={styles.AuthModalFooter}>
						Already have an account?
						<span className={styles.FooterBtn} onClick={() => setAuthMode(AUTH_MODE.LOGIN)}>
							Log in
						</span>
					</div>
				)}
			</div>
		</ModalOverlay>
	);
};

export default Auth;
