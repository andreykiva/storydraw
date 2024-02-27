import React from 'react';
import styles from './ActionItem.module.css';

type ActionItemProps = {
	actionTitle: string;
	icon: string;
};

const ActionItem = ({ actionTitle, icon }: ActionItemProps) => {
	return (
		<li className={styles.ActionItem}>
			<div className={styles.ItemContent}>
				<img src={icon} alt={actionTitle} className={styles.ActionIcon} />
				<span className={styles.ActionTitle}>{actionTitle}</span>
			</div>
		</li>
	);
};

export default ActionItem;
