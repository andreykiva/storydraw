import React, { useState } from 'react';
import styles from './LoginWithQR.module.css';
import Htag from '../../../components/ui/HTag/HTag';

const LoginWithQR = () => {
	return (
		<div className={styles.LoginWithQR}>
			<Htag tag="h2" className={styles.Title}>
				Log in with QR code
			</Htag>
			<div className={styles.QRcodeWrapper}>
				<div className={styles.QRcode}></div>
			</div>
			<div className={styles.QRcodeInfo}>
				<p className={styles.InfoStep}>1. Scan with your mobile device's camera</p>
				<p className={styles.InfoStep}>2. Confirm login or sign up</p>
			</div>
		</div>
	);
};

export default LoginWithQR;
