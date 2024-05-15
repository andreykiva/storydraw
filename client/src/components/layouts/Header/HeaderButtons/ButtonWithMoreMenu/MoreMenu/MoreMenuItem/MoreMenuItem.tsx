import React from 'react';
import styles from './MoreMenuItem.module.scss';

type MoreMenuItemProps = {
	title: string;
	icon: string;
	onClick: () => void;
	withBorder?: boolean;
};

const MoreMenuItem = (props: MoreMenuItemProps) => {
	const { title, icon, onClick, withBorder } = props;

	return (
		<div className={[styles.MoreMenuItem, withBorder && styles.WithBorder].join(' ')} onClick={onClick}>
			<img src={icon} alt={title} className={styles.ItemIcon} />
			<span className={styles.ItemText}>{title}</span>
		</div>
	);
};

export default MoreMenuItem;
