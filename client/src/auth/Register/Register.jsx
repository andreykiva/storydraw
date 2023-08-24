import React, { useState } from 'react';
import styles from './Register.module.css';
import RegisterOptions from './RegisterOptions/RegisterOptions';
import RegisterForm from './RegisterForm/RegisterForm';
import ArrowIcon from '../../components/UI/icons/ArrowIcon';
import RoundButton from '../../components/UI/RoundButton/RoundButton';

const Register = () => {
	const [displayMode, setDisplayMode] = useState('options');

	return (
		<div className={styles.Register}>
			{displayMode === 'form' && (
				<RoundButton className={styles.BackBtn} onClick={setDisplayMode.bind(this, 'options')}>
					<ArrowIcon className={styles.BackIcon} />
				</RoundButton>
			)}

			{displayMode === 'options' && <RegisterOptions openForm={setDisplayMode.bind(this, 'form')} />}
			{displayMode === 'form' && <RegisterForm />}
		</div>
	);
};

export default Register;
