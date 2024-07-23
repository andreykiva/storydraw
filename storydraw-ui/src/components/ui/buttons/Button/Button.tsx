import React from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';
import Loader from '../../Loader/Loader';

type ButtonProps = React.ComponentProps<'button'> & {
	loading?: boolean;
};

const Button = ({ className, children, disabled, loading, ...rest }: ButtonProps) => {
	return (
		<button className={cn(styles.Button, className)} {...rest} disabled={disabled || loading}>
			{loading ? <Loader className={styles.ButtonLoader} /> : children}
		</button>
	);
};

export default Button;
