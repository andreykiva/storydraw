import React from 'react';
import styles from './CompareItem.module.scss';
import checkIcon from '@/assets/icons/subscribe/check.svg?url';
import minusIcon from '@/assets/icons/subscribe/minus.svg?url';

type CompareItemProps = {
	title: string;
	isFree: boolean;
};

const CompareItem = ({ title, isFree }: CompareItemProps) => {
	return (
		<div className={styles.CompareItem}>
			<div className={styles.ItemTitle}>{title}</div>
			<div className={styles.ItemValue}>
				<img src={isFree ? checkIcon : minusIcon} className={styles.ItemIcon} />
			</div>
			<div className={styles.ItemValue}>
				<img src={checkIcon} alt="Check" className={styles.ItemIcon} />
			</div>
		</div>
	);
};

export default CompareItem;
