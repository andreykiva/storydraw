import React from 'react';
import styles from './ActionItem.module.scss';

type ActionItemProps = {
	actionTitle: string;
	icon: string;
	onClick?: () => void;
};

const ActionItem = ({ actionTitle, icon, onClick }: ActionItemProps) => {
	return (
		<li className={styles.ActionItem} onClick={onClick}>
			<div className={styles.ItemContent}>
				<img src={icon} alt={actionTitle} className={styles.ActionIcon} />
				<span className={styles.ActionTitle}>{actionTitle}</span>
			</div>
		</li>
	);
};

export default ActionItem;
