import React from 'react';
import styles from './CodeInput.module.css';
import Button from '@/components/ui/buttons/Button/Button';
import Input from '@/components/ui/inputs/Input/Input';

type CodeInputProps = React.ComponentProps<'input'> & {
	error: string;
	disabled: boolean;
};

const CodeInput = ({ error, disabled, ...rest }: CodeInputProps) => {
	return (
		<div className={styles.CodeInput}>
			<Input type="text" error={error} {...rest} />
			<Button className={styles.SendCodeBtn} disabled={disabled}>
				Send code
			</Button>
		</div>
	);
};

export default CodeInput;
