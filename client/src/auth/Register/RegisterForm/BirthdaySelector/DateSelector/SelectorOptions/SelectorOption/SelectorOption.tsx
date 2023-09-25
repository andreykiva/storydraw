import React from 'react';
import styles from './SelectorOption.module.css';
import CheckIcon from '@/components/ui/icons/CheckIcon';

type SelectorOptionProps = {
	children: React.ReactNode;
	selectedOption: string;
	onClick: () => void;
};

const SelectorOption = ({ children, selectedOption, onClick }: SelectorOptionProps) => {
	return (
		<li
			className={[styles.SelectorOption, children === selectedOption && styles.Selected].join(' ')}
			onClick={onClick}
		>
			<span>{children}</span>
			{children === selectedOption && <CheckIcon className={styles.SelectedIcon} />}
		</li>
	);
};

export default SelectorOption;
