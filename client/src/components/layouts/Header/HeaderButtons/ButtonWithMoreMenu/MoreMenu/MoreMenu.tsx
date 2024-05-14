import React from 'react';
import styles from './MoreMenu.module.css';
import languageIcon from '@/assets/icons/language.svg?url';
import helpIcon from '@/assets/icons/help.svg?url';
import darkModeIcon from '@/assets/icons/mode-dark.svg?url';
import profileIcon from '@/assets/icons/profile.svg?url';
import favoritesIcon from '@/assets/icons/favorites.svg?url';
import diamondIcon from '@/assets/icons/diamond.svg?url';
import settingsIcon from '@/assets/icons/settings.svg?url';
import logoutIcon from '@/assets/icons/logout.svg?url';
import MoreMenuItem from './MoreMenuItem/MoreMenuItem';
import WrapperWithTriangle from '@/components/ui/WrapperWithTriangle/WrapperWithTriangle';

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
		to: '/@andrii',
		target: '_self',
	},
	{
		type: 'link',
		title: 'Favorites',
		icon: favoritesIcon,
		to: '/@andrii',
		target: '_self',
	},
	{
		type: 'link',
		title: 'Get Premium',
		icon: diamondIcon,
		to: '/subscribe',
		target: '_self',
	},
	{
		type: 'link',
		title: 'Settings',
		icon: settingsIcon,
		to: '/settings',
		target: '_self',
	},
];

const MoreMenu = ({ isAuth, className }: MoreMenuProps) => {
	return (
		<WrapperWithTriangle position="bottomLeft" className={[styles.MoreMenu, className].join(' ')}>
			{isAuth && loggedInUserItems.map((item) => <MoreMenuItem key={item.title} {...item} />)}
			{generalItems.map((item) => (
				<MoreMenuItem key={item.title} {...item} />
			))}
			{isAuth && <MoreMenuItem type="item" title="Log out" icon={logoutIcon} withBorder={true} />}
		</WrapperWithTriangle>
	);
};

export default MoreMenu;
