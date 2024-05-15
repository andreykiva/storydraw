import React, { useState } from 'react';
import styles from './Register.module.scss';
import RegisterOptions from './RegisterOptions/RegisterOptions';
import AuthContainer from '@/auth/AuthContainer/AuthContainer';

type RegisterView = 'registerOptions' | 'registerForm';

const Register = () => {
	const [registerView, setRegisterView] = useState<RegisterView>('registerOptions');

	return (
		<div className={styles.Register}>
			{registerView === 'registerOptions' && (
				<RegisterOptions openForm={setRegisterView.bind(this, 'registerForm')} />
			)}
			{registerView === 'registerForm' && (
				<AuthContainer
					showRegisterOptions={setRegisterView.bind(this, 'registerOptions')}
					authMode={registerView}
				/>
			)}
		</div>
	);
};

export default Register;
