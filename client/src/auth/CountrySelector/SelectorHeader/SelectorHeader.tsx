import React from 'react';
import styles from './SelectorHeader.module.css';
import authSharedStyles from '@/auth/AuthSharedStyles.module.css';
import arrowDownIcon from '@/assets/icons/auth/arrow-down.svg';

type SelectorHeaderProps = {
	value: string;
	isOpen: boolean;
	onClick: () => void;
};

const SelectorHeader = ({ value, isOpen, onClick }: SelectorHeaderProps) => {
	return (
		<div className={authSharedStyles.SelectorHeader} onClick={onClick}>
			<span className={styles.SelectorValue}>{value}</span>
			<img
				src={arrowDownIcon}
				alt="Arrow down"
				className={[authSharedStyles.SelectorArrow, isOpen && authSharedStyles.ArrowUp].join(' ')}
			/>
		</div>
	);
};

export default SelectorHeader;
