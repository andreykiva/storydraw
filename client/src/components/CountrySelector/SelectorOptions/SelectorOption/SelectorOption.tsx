import React from 'react';
import styles from './SelectorOption.module.css';
import CheckIcon from '@/components/ui/icons/CheckIcon';

type SelectorOptionProps = {
	id: string;
	selectedOptionId: string;
	children: React.ReactNode;
	onClick: () => void;
};

const SelectorOption = ({ id, selectedOptionId, children, onClick }: SelectorOptionProps) => {
	return (
		<li className={styles.SelectorOption} onClick={onClick}>
			<span>{children}</span>
			{id === selectedOptionId && <CheckIcon className={styles.SelectedIcon} />}
		</li>
	);
};

export default SelectorOption;
