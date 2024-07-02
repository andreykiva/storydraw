import React from 'react';
import LikeIcon from '@/assets/icons/like.svg';
import PersonIcon from '@/assets/icons/person.svg';
import ExploreIcon from '@/assets/icons/explore.svg';
import NavItem from './NavItem/NavItem';

const links = [
	{
		title: 'For You',
		to: '/',
		iconComponent: <LikeIcon />,
	},
	{
		title: 'Following',
		to: '/following',
		iconComponent: <PersonIcon />,
	},
	{
		title: 'Explore',
		to: '/explore',
		iconComponent: <ExploreIcon />,
	},
];

const Nav = () => {
	return (
		<nav>
			<ul>
				{links.map((link) => (
					<NavItem key={link.title} title={link.title} to={link.to} iconComponent={link.iconComponent} />
				))}
			</ul>
		</nav>
	);
};

export default Nav;
