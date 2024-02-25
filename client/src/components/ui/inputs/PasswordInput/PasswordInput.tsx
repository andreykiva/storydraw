import React, { useState } from 'react';
import styles from './PasswordInput.module.css';
import eyeOpenedIcon from '@/assets/icons/auth/eye-opened.svg?url';
import eyeClosedIcon from '@/assets/icons/auth/eye-closed.svg?url';
import Input from '@/components/ui/inputs/Input/Input';

type PasswordInputProps = React.ComponentProps<'input'> & {
	error: string;
};

const PasswordInput = ({ error, ...rest }: PasswordInputProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const handlePasswordToggle = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className={styles.PasswordInput}>
			<img
				src={showPassword ? eyeOpenedIcon : eyeClosedIcon}
				alt="Eye"
				className={styles.ShowPasswordIcon}
				onClick={handlePasswordToggle}
			/>
			<Input type={showPassword ? 'text' : 'password'} mode="Password" error={error} {...rest} />
		</div>
	);
};

export default PasswordInput;
