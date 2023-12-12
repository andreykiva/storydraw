import React from 'react';
import styles from './NavItem.module.css';
import { NavLink } from 'react-router-dom';

type NavItemProps = {
	title: string;
	to: string;
	children: React.ReactNode;
};

const NavItem = ({ title, to, children }: NavItemProps) => {
	return (
		<li className={styles.NavItem}>
			<NavLink
				to={to}
				className={(isActive) => styles.NavLink + (isActive.isActive ? ` ${styles.ActiveLink}` : '')}
			>
				{children}
				<span>{title}</span>
			</NavLink>
		</li>
	);
};

export default NavItem;
