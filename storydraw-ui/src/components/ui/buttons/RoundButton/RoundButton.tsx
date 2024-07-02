import React from 'react';
import cn from 'classnames';
import styles from './RoundButton.module.scss';

const RoundButton = ({ className, children, ...rest }: React.ComponentProps<'button'>) => {
	return (
		<button className={cn(styles.RoundButton, className)} {...rest}>
			{children}
		</button>
	);
};

export default RoundButton;
