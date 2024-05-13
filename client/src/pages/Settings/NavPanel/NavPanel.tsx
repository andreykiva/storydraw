import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NavPanel.module.css';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import arrowIcon from '@/assets/icons/arrow-left.svg?url';
import PersonIcon from '@/assets/icons/settings/person.svg';
import LockIcon from '@/assets/icons/settings/lock.svg';
import BellIcon from '@/assets/icons/settings/bell.svg';
import NavItem from './NavItem/NavItem';
import type { SettingsSection } from '@/types/Settings';

type NavPanelProps = {
	activeSection: SettingsSection;
	onChangeActiveSection: (section: SettingsSection) => void;
};

const links = [
	{
		title: 'Manage account',
		to: 'manageAccounts',
		iconComponent: <PersonIcon />,
	},
	{
		title: 'Privacy',
		to: 'privacy',
		iconComponent: <LockIcon />,
	},
	{
		title: 'Push notifications',
		to: 'pushNotifications',
		iconComponent: <BellIcon />,
	},
];

const NavPanel = ({ activeSection, onChangeActiveSection }: NavPanelProps) => {
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
					<NavItem
						key={link.title}
						title={link.title}
						active={activeSection === link.to}
						iconComponent={link.iconComponent}
						onClick={onChangeActiveSection.bind(this, link.to)}
					/>
				))}
			</ul>
		</nav>
	);
};

export default NavPanel;
