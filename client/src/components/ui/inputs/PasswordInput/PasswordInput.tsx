import React, { useState } from 'react';
import styles from './PasswordInput.module.css';
import eyeOpenedImg from '@/assets/icons/auth/eye-opened.svg';
import eyeClosedImg from '@/assets/icons/auth/eye-closed.svg';
import Input from '@/components/ui/inputs/Input/Input';

type PasswordInputProps = React.ComponentProps<'input'> & {
	error: string;
};

const PasswordInput = ({ error, ...rest }: PasswordInputProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className={styles.PasswordInput}>
			<img
				src={showPassword ? eyeOpenedImg : eyeClosedImg}
				alt="Eye"
				className={styles.ShowPasswordIcon}
				onClick={handleTogglePassword}
			/>
			<Input type={showPassword ? 'text' : 'password'} mode="Password" error={error} {...rest} />
		</div>
	);
};

export default PasswordInput;
