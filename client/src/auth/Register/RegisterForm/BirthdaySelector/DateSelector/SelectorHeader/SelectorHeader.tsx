import React from 'react';
import styles from './SelectorHeader.module.css';
import arrowDownImg from '@/assets/icons/auth/arrow-down.svg';

type SelectorHeaderProps = {
	value: string | number;
	placeholder: string;
	isOpen: boolean;
	onClick: () => void;
};

const SelectorHeader = ({ value, placeholder, isOpen, onClick }: SelectorHeaderProps) => {
	return (
		<div className={styles.SelectorHeader} onClick={onClick}>
			{value ? (
				<span className={styles.SelectorValue}>{value}</span>
			) : (
				<span className={styles.SelectorPlaceholder}>{placeholder}</span>
			)}
			<img
				src={arrowDownImg}
				alt="Arrow down"
				className={[styles.SelectorArrow, isOpen && styles.ArrowUp].join(' ')}
			/>
		</div>
	);
};

export default SelectorHeader;
