import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MoreMenuItem.module.css';

type MoreMenuItemProps = {
	type: 'item' | 'link';
	title: string;
	icon: string;
	to?: string;
	target?: string;
	addBorder?: boolean;
};

const MoreMenuItem = (props: MoreMenuItemProps) => {
	const { type, title, icon, to, target, addBorder } = props;

	if (type === 'item') {
		return (
			<div key={title} className={[styles.MoreMenuItem, addBorder && styles.WithBorder].join(' ')}>
				<img src={icon} alt={title} className={styles.ItemIcon} />
				<span className={styles.ItemText}>{title}</span>
			</div>
		);
	} else if (type === 'link') {
		return (
			<Link key={title} to={to} target={target} className={styles.MoreMenuItem}>
				<img src={icon} alt={title} className={styles.ItemIcon} />
				<span className={styles.ItemText}>{title}</span>
			</Link>
		);
	}

	const neverType: never = type;
	return neverType;
};

export default MoreMenuItem;
