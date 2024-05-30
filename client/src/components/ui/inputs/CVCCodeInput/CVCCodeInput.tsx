import React from 'react';
import cn from 'classnames';
import styles from './CVCCodeInput.module.scss';
import Input from '@/components/ui/inputs/Input/Input';
import cvcIcon from '@/assets/icons/subscribe/cvv.svg?url';

type CVCCodeInputProps = React.ComponentProps<'input'> & {
	error: string;
};

const CVCCodeInput = ({ error, ...rest }: CVCCodeInputProps) => {
	return (
		<div className={cn(styles.CVCCodeInput, error && styles.WithError)}>
			<Input
				type="text"
				inputMode="numeric"
				autoComplete="billing cc-csc"
				placeholder="CVC"
				maxLength={4}
				error={error}
				{...rest}
			/>
			<div className={styles.CVCIconWr}>
				<img src={cvcIcon} alt="CVC" />
			</div>
		</div>
	);
};

export default CVCCodeInput;
