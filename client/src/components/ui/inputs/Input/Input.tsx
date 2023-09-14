import React from 'react';
import styles from './Input.module.css';
import warningImg from '@/assets/icons/auth/warning.svg';

type PasswordInputProps = React.ComponentProps<'input'> & {
	error: string;
};

const Input = ({ error, name, ...rest }: PasswordInputProps) => {
	let addClass = '';

	if (name === 'password') {
		addClass = 'Password';
	} else if (name === 'code') {
		addClass = 'Code';
	}

	return (
		<div className={[styles.FormGroup, styles[addClass], error && styles.GroupError].join(' ')}>
			<div className={styles.InputIcon}>
				<img src={warningImg} alt="Warning" className={styles.WarningIcon} />
			</div>
			<input className={styles.Input} name={name} {...rest} />
			{error && <p className={styles.InputError}>{error}</p>}
		</div>
	);
};

export default Input;
