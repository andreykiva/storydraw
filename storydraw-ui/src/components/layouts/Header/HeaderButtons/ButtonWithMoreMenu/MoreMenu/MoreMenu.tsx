import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import styles from './MoreMenu.module.scss';
import languageIcon from '@/assets/icons/language.svg';
import helpIcon from '@/assets/icons/help.svg';
import darkModeIcon from '@/assets/icons/mode-dark.svg';
import profileIcon from '@/assets/icons/profile.svg';
import favoritesIcon from '@/assets/icons/favorites.svg';
import diamondIcon from '@/assets/icons/diamond.svg';
import settingsIcon from '@/assets/icons/settings.svg';
import logoutIcon from '@/assets/icons/logout.svg';
import MoreMenuItem from './MoreMenuItem/MoreMenuItem';
import WrapperWithTriangle from '@/components/ui/WrapperWithTriangle/WrapperWithTriangle';
import { MENU_POSITION } from '@/constants/ui';
import { selectUser } from '@/features/user/userSlice';

type MoreMenuProps = {
	isAuth: boolean;
	className: string;
	onOpenLogoutModal: () => void;
};

type MenuItem = {
	title: string;
	icon: string;
	onClick: () => void;
};

const MoreMenu = ({ isAuth, className, onOpenLogoutModal }: MoreMenuProps) => {
	const navigate = useNavigate();
	const currentUser = useSelector(selectUser);

	const generalItems: MenuItem[] = [
		{
			title: 'English',
			icon: languageIcon,
			onClick: () => {},
		},
		{
			title: 'Help',
			icon: helpIcon,
			onClick: () => navigate('/'),
		},
		{
			title: 'Dark Mode',
			icon: darkModeIcon,
			onClick: () => {},
		},
	];

	const loggedInUserItems: MenuItem[] = [
		{
			title: 'View profile',
			icon: profileIcon,
			onClick: () => navigate(`/@${currentUser.username}`),
		},
		{
			title: 'Favorites',
			icon: favoritesIcon,
			onClick: () => navigate(`/@${currentUser.username}?tab=favorites`),
		},
		{
			title: 'Get Premium',
			icon: diamondIcon,
			onClick: () => navigate('/subscribe'),
		},
		{
			title: 'Settings',
			icon: settingsIcon,
			onClick: () => navigate('/settings'),
		},
	];

	return (
		<WrapperWithTriangle position={MENU_POSITION.BOTTOM_LEFT} className={cn(styles.MoreMenu, className)}>
			{isAuth && loggedInUserItems.map((item) => <MoreMenuItem key={item.title} {...item} />)}
			{generalItems.map((item) => (
				<MoreMenuItem key={item.title} {...item} />
			))}
			{isAuth && <MoreMenuItem title="Log out" icon={logoutIcon} withBorder={true} onClick={onOpenLogoutModal} />}
		</WrapperWithTriangle>
	);
};

export default MoreMenu;
