import React from 'react';
import styles from './TrialInfoItem.module.scss';

type TrialInfoItemProps = {
	title: string;
	descr: string;
	icon: string;
};

const TrialInfoItem = ({ title, descr, icon }: TrialInfoItemProps) => {
	return (
		<div className={styles.TrialInfoItem}>
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
