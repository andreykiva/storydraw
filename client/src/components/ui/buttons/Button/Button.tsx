import React from 'react';
import styles from './Button.module.scss';

const Button = ({ className, children, ...rest }: React.ComponentProps<'button'>) => {
	return (
		<button className={[styles.Button, className].join(' ')} {...rest}>
			{children}
		</button>
	);
};

export default Button;
