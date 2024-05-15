import React from 'react';
import styles from './Logo.module.scss';
import logoImg from '@/assets/images/logo.png';
import { Link } from 'react-router-dom';

const Logo = () => {
	return (
		<div className={styles.Logo}>
			<Link to="/">
				<img src={logoImg} alt="StoryDraw Logo" />
			</Link>
		</div>
	);
};

export default Logo;
