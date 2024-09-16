import { useEffect, useState } from 'react';
import styles from './CodeInput.module.scss';
import Button from '@/components/ui/buttons/Button/Button';
import Input from '@/components/ui/inputs/Input/Input';
import { INPUT_MODE } from '@/constants/ui';

type CodeInputProps = React.ComponentProps<'input'> & {
	error: string;
	isOtherErrors?: boolean;
	disabled: boolean;
	loading: boolean;
	onSendCode: () => void;
};

const CodeInput = ({ error, isOtherErrors, disabled, loading, onSendCode, ...rest }: CodeInputProps) => {
	const [timer, setTimer] = useState(59);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if (loading) return;

		if (error || isOtherErrors) {
			setIsActive(false);
			return;
		}

		let intervalId: ReturnType<typeof setTimeout>;

		if (isActive) {
			intervalId = setInterval(() => {
				setTimer((prevTimer) => {
					if (prevTimer === 0) {
						clearInterval(intervalId);
						setIsActive(false);
					}
					return prevTimer > 0 ? prevTimer - 1 : 0;
				});
			}, 1000);
		}

		return () => clearInterval(intervalId);
	}, [isActive, loading, error, isOtherErrors]);

	const handleButtonClick = () => {
		if (!isActive) {
			onSendCode();
			setTimer(59);
			setIsActive(true);
		}
	};

	return (
		<div className={styles.CodeInput}>
			<Input type="text" mode={INPUT_MODE.CODE} error={error} {...rest} />
			<Button
				className={styles.SendCodeBtn}
				type="button"
				disabled={disabled || isActive}
				onClick={handleButtonClick}
				loading={loading}
			>
				{isActive ? `Resend code: ${timer}s` : 'Send code'}
			</Button>
		</div>
	);
};

export default CodeInput;
