import React from 'react';
import styles from './Nav.module.css';
import { NavLink } from 'react-router-dom';
import LikeIcon from '../../../ui/icons/LikeIcon';
import PersonIcon from '../../../ui/icons/PersonIcon';
import ExploreIcon from '../../../ui/icons/ExploreIcon';

const links = [
	{
		title: 'For You',
		to: '/',
		iconComponemt: <LikeIcon className={styles.NavLinkIcon} />,
	},
	{
		title: 'Following',
		to: '/following',
		iconComponemt: <PersonIcon className={styles.NavLinkIcon} />,
	},
	{
		title: 'Explore',
		to: '/explore',
		iconComponemt: <ExploreIcon className={styles.NavLinkIcon} />,
	},
];

const Nav = () => {
	return (
		<nav className={styles.Nav}>
			<ul>
				{links.map((link) => (
					<li key={link.title} className={styles.NavItem}>
						<NavLink
							to={link.to}
							className={(isActive) =>
								styles.NavLink + (isActive.isActive ? ` ${styles.ActiveLink}` : '')
							}
						>
							{link.iconComponemt}
							<span>{link.title}</span>
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Nav;
