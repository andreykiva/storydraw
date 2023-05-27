import React from 'react';
import styles from './Button.module.css';

const Button = ({ className, children }) => {
	return <button className={[styles.Button, className].join(' ')}>{children}</button>;
};

export default Button;
