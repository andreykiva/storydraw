import React from 'react';
import cn from 'classnames';
import styles from './Textarea.module.scss';
import warningIcon from '@/assets/icons/auth/warning.svg';

type TextareaProps = React.ComponentProps<'textarea'> & {
	error: string;
};

const Textarea = ({ error, ...rest }: TextareaProps) => {
	return (
		<div className={cn(styles.FormGroup, error && styles.GroupError)}>
			<div className={styles.TextareaIcon}>
				<img src={warningIcon} alt="Warning" className={styles.WarningIcon} />
			</div>
			<textarea className={styles.Textarea} {...rest} />
			<p className={styles.TextareaError}>{error}</p>
		</div>
	);
};

export default Textarea;
