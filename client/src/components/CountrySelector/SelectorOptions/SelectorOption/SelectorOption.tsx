import React from 'react';
import styles from './SelectorOption.module.css';
import checkImg from '@/assets/icons/auth/check.svg';

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
			{id === selectedOptionId && <img src={checkImg} alt="Check" className={styles.SelectedIcon} />}
		</li>
	);
};

export default SelectorOption;
