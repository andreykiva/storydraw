import React, { useState } from 'react';
import styles from './Register.module.css';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
import RegisterOptions from './RegisterOptions/RegisterOptions';
import ArrowIcon from '@/components/ui/icons/ArrowIcon';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import AuthContainer from '@/auth/AuthContainer/AuthContainer';

type RegisterView = 'registerOptions' | 'registerForm';

const Register = () => {
	const [registerView, setRegisterView] = useState<RegisterView>('registerOptions');

	return (
		<div className={styles.Register}>
			{registerView === 'registerForm' && (
				<RoundButton
					className={authSharedStyles.BackBtn}
					onClick={setRegisterView.bind(this, 'registerOptions')}
				>
					<ArrowIcon className={authSharedStyles.BackIcon} />
				</RoundButton>
			)}

			{registerView === 'registerOptions' && (
				<RegisterOptions openForm={setRegisterView.bind(this, 'registerForm')} />
			)}
			{registerView === 'registerForm' && <AuthContainer authMode={registerView} />}
		</div>
	);
};

export default Register;
