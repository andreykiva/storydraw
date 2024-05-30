import React from 'react';
import Input from '@/components/ui/inputs/Input/Input';

type ExpirationDateInputProps = React.ComponentProps<'input'> & {
	error: string;
};

const ExpirationDateInput = ({ error, ...rest }: ExpirationDateInputProps) => {
	return (
		<Input
			type="text"
			inputMode="numeric"
			autoComplete="billing cc-exp"
			placeholder="MM/YY"
			maxLength={5}
			error={error}
			{...rest}
		/>
	);
};

export default ExpirationDateInput;
