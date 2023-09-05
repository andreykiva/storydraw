import React, { useState } from 'react';
import styles from './Register.module.css';
import RegisterOptions from './RegisterOptions/RegisterOptions';
import RegisterForm from './RegisterForm/RegisterForm';
import ArrowIcon from '../../components/ui/icons/ArrowIcon';
import RoundButton from '../../components/ui/RoundButton/RoundButton';

const Register = () => {
	const [registerView, setRegisterView] = useState('options');

	return (
		<div className={styles.Register}>
			{registerView === 'form' && (
				<RoundButton className={styles.BackBtn} onClick={setRegisterView.bind(this, 'options')}>
					<ArrowIcon className={styles.BackIcon} />
				</RoundButton>
			)}

			{registerView === 'options' && <RegisterOptions openForm={setRegisterView.bind(this, 'form')} />}
			{registerView === 'form' && <RegisterForm />}
		</div>
	);
};

export default Register;
