import React from 'react';
import styles from './AuthOption.module.css';

type AuthOptionProps = {
	title: string;
	alt: string;
	icon: string;
	handleClick: () => void;
};

const AuthOption = (props: AuthOptionProps) => {
	const { icon, alt, title, handleClick } = props;

	return (
		<li className={styles.AuthOption} onClick={handleClick}>
			<img src={icon} alt={alt} className={styles.OptionIcon} />
			<span className={styles.OptionTitle}>{title}</span>
		</li>
	);
};

export default AuthOption;
