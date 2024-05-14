import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MoreMenuItem.module.css';

type MoreMenuItemProps = {
	type: 'item' | 'link';
	title: string;
	icon: string;
	to?: string;
	target?: string;
	withBorder?: boolean;
};

const MoreMenuItem = (props: MoreMenuItemProps) => {
	const { type, title, icon, to, target, withBorder } = props;

	const itemContent = (
		<>
			<img src={icon} alt={title} className={styles.ItemIcon} />
			<span className={styles.ItemText}>{title}</span>
		</>
	);

	if (type === 'item') {
		return (
			<div key={title} className={[styles.MoreMenuItem, withBorder && styles.WithBorder].join(' ')}>
				{itemContent}
			</div>
		);
	} else if (type === 'link') {
		return (
			<Link key={title} to={to} target={target} className={styles.MoreMenuItem}>
				{itemContent}
			</Link>
		);
	}

	const neverType: never = type;
	return neverType;
};

export default MoreMenuItem;
