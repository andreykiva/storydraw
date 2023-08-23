import React, { useState } from 'react';
import styles from './Register.module.css';
import userImg from '../../assets/icons/user.svg';
import googleImg from '../../assets/icons/google.svg';
import facebookImg from '../../assets/icons/facebook.svg';
import twitterImg from '../../assets/icons/twitter.svg';

const Register = () => {
	return (
		<div className={styles.Register}>
			<h3 className={styles.Title}>Sign Up for StoryDraw</h3>
			<ul className={styles.RegisterOptions}>
				<li className={styles.RegisterOption}>
					<img src={userImg} alt="Phone/Email" className={styles.OptionIcon} />
					<span className={styles.OptionTitle}>Use phone or email</span>
				</li>
				<li className={styles.RegisterOption}>
					<img src={googleImg} alt="Google" className={styles.OptionIcon} />
					<span className={styles.OptionTitle}>Continue with Google</span>
				</li>
				<li className={styles.RegisterOption}>
					<img src={facebookImg} alt="Facebook" className={styles.OptionIcon} />
					<span className={styles.OptionTitle}>Continue with Facebook</span>
				</li>
				<li className={styles.RegisterOption}>
					<img src={twitterImg} alt="Twitter" className={styles.OptionIcon} />
					<span className={styles.OptionTitle}>Continue with Twitter</span>
				</li>
			</ul>
		</div>
	);
};

export default Register;
