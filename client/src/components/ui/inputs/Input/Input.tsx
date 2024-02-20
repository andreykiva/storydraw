import React from 'react';
import styles from './Input.module.css';
import warningIcon from '@/assets/icons/auth/warning.svg';

type PasswordInputProps = React.ComponentProps<'input'> & {
	error: string;
	mode?: string;
};

const Input = ({ error, mode, ...rest }: PasswordInputProps) => {
	return (
		<div className={[styles.FormGroup, styles[mode], error && styles.GroupError].join(' ')}>
			<div className={styles.InputIcon}>
				<img src={warningIcon} alt="Warning" className={styles.WarningIcon} />
			</div>
			<input className={styles.Input} {...rest} />
			{error && <p className={styles.InputError}>{error}</p>}
		</div>
	);
};

export default Input;
