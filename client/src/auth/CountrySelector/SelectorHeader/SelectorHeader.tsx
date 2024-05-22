import React from 'react';
import cn from 'classnames';
import styles from './SelectorHeader.module.scss';
import authSharedStyles from '@/auth/AuthSharedStyles.module.scss';
import arrowDownIcon from '@/assets/icons/arrow-down.svg?url';

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
				className={cn(authSharedStyles.SelectorArrow, isOpen && authSharedStyles.ArrowUp)}
			/>
		</div>
	);
};

export default SelectorHeader;
