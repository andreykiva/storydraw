import React from 'react';
import styles from './ActionItem.module.scss';

type ActionItemProps = {
	name: string;
	iconComponent: React.ReactNode;
	onClick: () => void;
};

const ActionItem = ({ name, iconComponent, onClick }: ActionItemProps) => {
	return (
		<li className={styles.ActionItem} onClick={onClick}>
			{iconComponent}
			<span>{name}</span>
		</li>
	);
};

export default ActionItem;
