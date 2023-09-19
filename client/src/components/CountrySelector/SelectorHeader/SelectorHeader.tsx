import React from 'react';
import styles from './SelectorHeader.module.css';
import arrowDownImg from '@/assets/icons/auth/arrow-down.svg';

type SelectorHeaderProps = {
	value: string;
	isOpen: boolean;
	onClick: () => void;
};

const SelectorHeader = ({ value, isOpen, onClick }: SelectorHeaderProps) => {
	return (
		<div className={styles.SelectorHeader} onClick={onClick}>
			<span className={styles.SelectorValue}>{value}</span>
			<img
				src={arrowDownImg}
				alt="Arrow down"
				className={[styles.SelectorArrow, isOpen && styles.ArrowUp].join(' ')}
			/>
		</div>
	);
};

export default SelectorHeader;
