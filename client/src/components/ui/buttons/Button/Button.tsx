import React from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

const Button = ({ className, children, ...rest }: React.ComponentProps<'button'>) => {
	return (
		<button className={cn(styles.Button, className)} {...rest}>
			{children}
		</button>
	);
};

export default Button;
