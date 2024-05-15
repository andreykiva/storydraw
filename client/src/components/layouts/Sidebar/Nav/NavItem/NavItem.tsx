import React from 'react';
import styles from './NavItem.module.scss';
import { NavLink } from 'react-router-dom';

type NavItemProps = {
	title: string;
	to: string;
	iconComponent: React.ReactNode;
};

const NavItem = ({ title, to, iconComponent }: NavItemProps) => {
	return (
		<li className={styles.NavItem}>
			<NavLink
				to={to}
				className={(isActive) => styles.NavLink + (isActive.isActive ? ` ${styles.ActiveLink}` : '')}
			>
				{iconComponent}
				<span>{title}</span>
			</NavLink>
		</li>
	);
};

export default NavItem;
