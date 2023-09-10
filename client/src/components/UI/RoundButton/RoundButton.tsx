import React from 'react';
import styles from './RoundButton.module.css';

const RoundButton = ({ className, onClick, children }) => {
	return <button className={[styles.RoundButton, className].join(' ')} onClick={onClick}>{children}</button>;
};

export default RoundButton;
