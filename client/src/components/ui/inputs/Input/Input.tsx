import React from 'react';
import cn from 'classnames';
import styles from './Input.module.scss';
import warningIcon from '@/assets/icons/auth/warning.svg?url';
import { INPUT_MODE } from '@/constants/ui';

type PasswordInputProps = React.ComponentProps<'input'> & {
	error: string;
	mode?: INPUT_MODE;
};

const Input = ({ error, mode, ...rest }: PasswordInputProps) => {
	return (
		<div className={cn(styles.FormGroup, styles[mode], error && styles.GroupError)}>
			<div className={styles.InputIcon}>
				<img src={warningIcon} alt="Warning" className={styles.WarningIcon} />
			</div>
			<input className={styles.Input} {...rest} />
			{error && <p className={styles.InputError}>{error}</p>}
		</div>
	);
};

export default Input;
