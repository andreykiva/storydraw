import React from 'react';
import styles from './AuthOption.module.css';

const AuthOption = (props) => {
	const { img, alt, title, handleClick } = props;

	return (
		<li className={styles.AuthOption} onClick={handleClick}>
			<img src={img} alt={alt} className={styles.OptionIcon} />
			<span className={styles.OptionTitle}>{title}</span>
		</li>
	);
};

export default AuthOption;
