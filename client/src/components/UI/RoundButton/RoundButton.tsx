import React from 'react';
import styles from './RoundButton.module.css';

const RoundButton = ({ className, children, ...rest }: React.ComponentProps<'button'>) => {
	return <button className={[styles.RoundButton, className].join(' ')} {...rest}>{children}</button>;
};

export default RoundButton;
