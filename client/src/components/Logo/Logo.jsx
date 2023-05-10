import React from 'react';
import styles from './Logo.module.css';
import logoImg from '../../assets/icons/logo.png';
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
