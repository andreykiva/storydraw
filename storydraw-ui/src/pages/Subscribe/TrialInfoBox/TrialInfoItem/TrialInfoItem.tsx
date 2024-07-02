import React from 'react';
import cn from 'classnames';
import styles from './TrialInfoItem.module.scss';
import { TRIAL_INFO_SIZE } from '@/constants/subscription';

type TrialInfoItemProps = {
	title: string;
	descr: string;
	icon: string;
	size?: TRIAL_INFO_SIZE;
};

const TrialInfoItem = ({ title, descr, icon, size = TRIAL_INFO_SIZE.LARGE }: TrialInfoItemProps) => {
	const sizeClass = size === TRIAL_INFO_SIZE.SMALL ? styles.Small : styles.Large;

	return (
		<div className={cn(styles.TrialInfoItem, sizeClass)}>
			<div className={styles.ItemLeft}>
				<img src={icon} className={styles.ItemIcon} />
				<div className={styles.ItemConnection}></div>
			</div>
			<div className={styles.ItemRight}>
				<div className={styles.ItemTitle}>{title}</div>
				<p className={styles.ItemDescr}>{descr}</p>
			</div>
		</div>
	);
};

export default TrialInfoItem;
