import React, { useState } from 'react';
import styles from './Login.module.css';
import qrCodeImg from '../../assets/icons/qr-code.svg';
import userImg from '../../assets/icons/user.svg';
import googleImg from '../../assets/icons/google.svg';
import facebookImg from '../../assets/icons/facebook.svg';
import twitterImg from '../../assets/icons/twitter.svg';
import appleImg from '../../assets/icons/apple.svg';
import instagramImg from '../../assets/icons/instagram.svg';

const Login = () => {
	return (
		<div className={styles.Login}>
			<h3 className={styles.Title}>Log in to StoryDraw</h3>
			<ul className={styles.LoginOptions}>
				<li className={styles.LoginOption}>
					<img src={qrCodeImg} alt="QR code" className={styles.OptionIcon} />
					<span className={styles.OptionTitle}>Use QR code</span>
				</li>
				<li className={styles.LoginOption}>
					<img src={userImg} alt="Phone/Email/Username" className={styles.OptionIcon} />
					<span className={styles.OptionTitle}>Use phone / email / username</span>
				</li>
				<li className={styles.LoginOption}>
					<img src={googleImg} alt="Google" className={styles.OptionIcon} />
					<span className={styles.OptionTitle}>Continue with Google</span>
				</li>
				<li className={styles.LoginOption}>
					<img src={facebookImg} alt="Facebook" className={styles.OptionIcon} />
					<span className={styles.OptionTitle}>Continue with Facebook</span>
				</li>
				<li className={styles.LoginOption}>
					<img src={twitterImg} alt="Twitter" className={styles.OptionIcon} />
					<span className={styles.OptionTitle}>Continue with Twitter</span>
				</li>
				<li className={styles.LoginOption}>
					<img src={appleImg} alt="Apple" className={styles.OptionIcon} />
					<span className={styles.OptionTitle}>Continue with Apple</span>
				</li>
				<li className={styles.LoginOption}>
					<img src={instagramImg} alt="Instagram" className={styles.OptionIcon} />
					<span className={styles.OptionTitle}>Continue with Instagram</span>
				</li>
			</ul>
		</div>
	);
};

export default Login;
