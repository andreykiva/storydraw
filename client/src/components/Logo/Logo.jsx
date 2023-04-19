import React from 'react';
import styles from './Logo.module.css';
import logoImg from '../../assets/icons/logo.png';

const Logo = () => {
	return (
		<div className={styles.Logo}>
			<img src={logoImg} alt="StoryDraw Logo" />
		</div>
	);
};

export default Logo;
