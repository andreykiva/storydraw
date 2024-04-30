import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NavPanel.module.css';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import arrowIcon from '@/assets/icons/arrow-left.svg?url';
import PersonIcon from '@/assets/icons/settings/person.svg';
import LockIcon from '@/assets/icons/settings/lock.svg';
import BellIcon from '@/assets/icons/settings/bell.svg';
import NavItem from './NavItem/NavItem';

const links = [
	{
		title: 'Manage account',
		to: '/',
		iconComponent: <PersonIcon />,
	},
	{
		title: 'Privacy',
		to: '/following',
		iconComponent: <LockIcon />,
	},
	{
		title: 'Push notifications',
		to: '/explore',
		iconComponent: <BellIcon />,
	},
];

const NavPanel = () => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<nav className={styles.NavPanel}>
			<RoundButton className={styles.BackBtn} onClick={handleBack}>
				<img src={arrowIcon} alt="Back" className={styles.BackIcon} />
			</RoundButton>
			<ul>
				{links.map((link) => (
					<NavItem key={link.title} title={link.title}>
						{link.iconComponent}
					</NavItem>
				))}
			</ul>
		</nav>
	);
};

export default NavPanel;
