import React from 'react';
import styles from './Nav.module.css';
import LikeIcon from '@/components/ui/icons/LikeIcon';
import PersonIcon from '@/components/ui/icons/PersonIcon';
import ExploreIcon from '@/components/ui/icons/ExploreIcon';
import NavItem from './NavItem/NavItem';

const links = [
	{
		title: 'For You',
		to: '/',
		iconComponemt: <LikeIcon />,
	},
	{
		title: 'Following',
		to: '/following',
		iconComponemt: <PersonIcon />,
	},
	{
		title: 'Explore',
		to: '/explore',
		iconComponemt: <ExploreIcon />,
	},
];

const Nav = () => {
	return (
		<nav className={styles.Nav}>
			<ul>
				{links.map((link) => (
					<NavItem key={link.title} title={link.title} to={link.to}>
						{link.iconComponemt}
					</NavItem>
				))}
			</ul>
		</nav>
	);
};

export default Nav;
