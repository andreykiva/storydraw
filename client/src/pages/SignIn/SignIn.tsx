import React from 'react';
import styles from './SignIn.module.css';
import LogoImg from '@/assets/icons/logo.png';

const SignIn = () => {
	return (
		<div className={styles.SignIn}><img src={LogoImg} alt="Logo" /> </div>
	);
};

export default SignIn;
