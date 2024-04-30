import React from 'react';
import styles from './NavItem.module.css';

type NavItemProps = {
	title: string;
	children: React.ReactNode;
};

const NavItem = ({ title, children }: NavItemProps) => {
	return (
		<li className={[styles.NavItem, styles.Activ].join(' ')}>
			{children}
			<span>{title}</span>
		</li>
	);
};

export default NavItem;
