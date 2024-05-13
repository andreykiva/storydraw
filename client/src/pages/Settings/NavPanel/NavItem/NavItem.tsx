import React from 'react';
import styles from './NavItem.module.css';

type NavItemProps = {
	title: string;
	active: boolean;
	iconComponent: React.ReactNode;
	onClick: () => void;
};

const NavItem = ({ title, active, iconComponent, onClick }: NavItemProps) => {
	return (
		<li className={[styles.NavItem, active && styles.Active].join(' ')} onClick={onClick}>
			{iconComponent}
			<span>{title}</span>
		</li>
	);
};

export default NavItem;
