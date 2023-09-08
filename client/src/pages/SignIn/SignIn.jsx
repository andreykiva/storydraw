import React from 'react';
import classes from './SignIn.module.css';
import LogoImg from '@/assets/icons/logo.png'

const SignIn = () => {
	return (
		<div className={classes.SignIn}><img src={LogoImg} alt="Logo" /> </div>
	);
};

export default SignIn;
