import React from 'react';
import styles from './MoreMenu.module.css';
import languageIcon from '@/assets/icons/language.svg';
import helpIcon from '@/assets/icons/help.svg';
import darkModeIcon from '@/assets/icons/mode-dark.svg';
import profileIcon from '@/assets/icons/profile.svg';
import favoritesIcon from '@/assets/icons/favorites.svg';
import coinIcon from '@/assets/icons/coin.svg';
import settingsIcon from '@/assets/icons/settings.svg';
import logoutIcon from '@/assets/icons/logout.svg';
import MoreMenuItem from './MoreMenuItem/MoreMenuItem';

type MoreMenuProps = {
	isAuth: boolean;
	className: string;
};

type MenuItem = {
	type: 'item' | 'link';
	title: string;
	icon: string;
	to?: string;
	target?: string;
};

const generalItems: MenuItem[] = [
	{
		type: 'item',
		title: 'English',
		icon: languageIcon,
	},
	{
		type: 'link',
		title: 'Help',
		icon: helpIcon,
		to: '/',
		target: '_blank',
	},
	{
		type: 'item',
		title: 'Dark Mode',
		icon: darkModeIcon,
	},
];

const loggedInUserItems: MenuItem[] = [
	{
		type: 'link',
		title: 'View profile',
		icon: profileIcon,
		to: '/',
		target: '_self',
	},
	{
		type: 'link',
		title: 'Favorites',
		icon: favoritesIcon,
		to: '/',
		target: '_self',
	},
	{
		type: 'link',
		title: 'Get Coins',
		icon: coinIcon,
		to: '/',
		target: '_self',
	},
	{
		type: 'link',
		title: 'Settings',
		icon: settingsIcon,
		to: '/',
		target: '_self',
	},
];

const MoreMenu = ({ isAuth, className }: MoreMenuProps) => {
	return (
		<div className={[styles.MoreMenu, className].join(' ')}>
			<div className={styles.MenuTriangle}></div>
			{isAuth && loggedInUserItems.map((item) => <MoreMenuItem key={item.title} {...item} />)}
			{generalItems.map((item) => (
				<MoreMenuItem key={item.title} {...item} />
			))}
			{isAuth && <MoreMenuItem type="item" title="Log out" icon={logoutIcon} addBorder={true} />}
		</div>
	);
};

export default MoreMenu;
