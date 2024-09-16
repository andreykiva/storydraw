import React from 'react';
import cn from 'classnames';
import styles from './Input.module.scss';
import warningIcon from '@/assets/icons/auth/warning.svg';
import { INPUT_MODE } from '@/constants/ui';

type InputProps = React.ComponentProps<'input'> & {
	error: string;
	mode?: INPUT_MODE;
};

const Input = ({ error, mode, ...rest }: InputProps) => {
	return (
		<div className={cn(styles.FormGroup, styles[mode], error && styles.GroupError)}>
			<div className={styles.InputIcon}>
				<img src={warningIcon} alt="Warning" className={styles.WarningIcon} />
			</div>
			<input className={styles.Input} {...rest} />
			<p className={styles.InputError}>{error}</p>
		</div>
	);
};

export default Input;
