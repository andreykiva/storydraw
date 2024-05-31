import React from 'react';
import styles from './CodeInput.module.scss';
import Button from '@/components/ui/buttons/Button/Button';
import Input from '@/components/ui/inputs/Input/Input';
import { INPUT_MODE } from '@/constants/ui';

type CodeInputProps = React.ComponentProps<'input'> & {
	error: string;
	disabled: boolean;
};

const CodeInput = ({ error, disabled, ...rest }: CodeInputProps) => {
	return (
		<div className={styles.CodeInput}>
			<Input type="text" mode={INPUT_MODE.CODE} error={error} {...rest} />
			<Button className={styles.SendCodeBtn} type="button" disabled={disabled}>
				Send code
			</Button>
		</div>
	);
};

export default CodeInput;
