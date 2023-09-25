import React from 'react';
import styles from './SelectorHeader.module.css';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
import arrowDownImg from '@/assets/icons/auth/arrow-down.svg';

type SelectorHeaderProps = {
	value: string | number;
	placeholder: string;
	isOpen: boolean;
	onClick: () => void;
};

const SelectorHeader = ({ value, placeholder, isOpen, onClick }: SelectorHeaderProps) => {
	return (
		<div className={authSharedStyles.SelectorHeader} onClick={onClick}>
			{value ? (
				<span className={styles.SelectorValue}>{value}</span>
			) : (
				<span className={styles.SelectorPlaceholder}>{placeholder}</span>
			)}
			<img
				src={arrowDownImg}
				alt="Arrow down"
				className={[authSharedStyles.SelectorArrow, isOpen && authSharedStyles.ArrowUp].join(' ')}
			/>
		</div>
	);
};

export default SelectorHeader;
