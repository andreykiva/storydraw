import React, { useState } from 'react';
import styles from './LoginWithQR.module.css';

const LoginWithQR = () => {
	return (
		<div className={styles.LoginWithQR}>
			<h3 className={styles.Title}>Log in with QR code</h3>
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
