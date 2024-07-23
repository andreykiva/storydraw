import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './ValidatedInput.module.scss';
import warningIcon from '@/assets/icons/auth/warning.svg?url';
import CheckIcon from '@/assets/icons/check.svg';
import { debounce } from '@/utils/timeUtils';
import Loader from '@/components/ui/Loader/Loader';

type ValidatedInputProps = React.ComponentProps<'input'> & {
	error: string;
	loading: boolean;
	request: (value: string) => void;
};

const ValidatedInput = ({ error, loading, request, value, onChange, ...rest }: ValidatedInputProps) => {
	const [timerId, setTimerId] = useState(null);
	const [isLoading, setIsLoading] = useState(loading);
	const isValid = value && !error;

	useEffect(() => {
		setIsLoading(loading);
	}, [loading]);

	const debouncedFetchData = debounce(request, 1000, timerId, setTimerId);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e);
		debouncedFetchData(e.target.value);
		setIsLoading(true);
	};

	return (
		<div className={cn(styles.FormGroup, error && styles.GroupError, isValid && styles.Valid, isLoading && styles.Loading)}>
			<div className={styles.InputIcon}>
				<CheckIcon className={styles.CheckIcon} />
				<img src={warningIcon} alt="Warning" className={styles.WarningIcon} />
				<Loader className={styles.Loader} />
			</div>
			<input className={styles.ValidatedInput} value={value} onChange={handleChangeInput} {...rest} />
			<p className={styles.InputError}>{error}</p>
		</div>
	);
};

export default ValidatedInput;
