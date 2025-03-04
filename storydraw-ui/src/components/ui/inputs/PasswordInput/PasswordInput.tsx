import { useState } from 'react';
import styles from './PasswordInput.module.scss';
import eyeOpenedIcon from '@/assets/icons/auth/eye-opened.svg';
import eyeClosedIcon from '@/assets/icons/auth/eye-closed.svg';
import Input from '@/components/ui/inputs/Input/Input';
import { INPUT_MODE } from '@/constants/ui';

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
				src={showPassword ? eyeOpenedIcon : eyeClosedIcon}
				alt="Eye"
				className={styles.ShowPasswordIcon}
				onClick={handleTogglePassword}
			/>
			<Input type={showPassword ? 'text' : 'password'} mode={INPUT_MODE.PASSWORD} error={error} {...rest} />
		</div>
	);
};

export default PasswordInput;
