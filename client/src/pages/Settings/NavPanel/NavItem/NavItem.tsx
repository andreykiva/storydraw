import React from 'react';
import styles from './NavItem.module.css';

type NavItemProps = {
	title: string;
	active: boolean;
	children: React.ReactNode;
	onClick: () => void;
};

const NavItem = ({ title, active, children, onClick }: NavItemProps) => {
	return (
		<li className={[styles.NavItem, active && styles.Active].join(' ')} onClick={onClick}>
			{children}
			<span>{title}</span>
		</li>
	);
};

export default NavItem;
