import React from 'react';
import styles from './AuthOption.module.css';

type AuthOptionProps = {
	title: string;
	alt: string;
	image: string;
	handleClick: () => void;
};

const AuthOption = (props: AuthOptionProps) => {
	const { image, alt, title, handleClick } = props;

	return (
		<li className={styles.AuthOption} onClick={handleClick}>
			<img src={image} alt={alt} className={styles.OptionIcon} />
			<span className={styles.OptionTitle}>{title}</span>
		</li>
	);
};

export default AuthOption;
