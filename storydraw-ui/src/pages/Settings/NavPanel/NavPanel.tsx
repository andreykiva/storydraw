import { useNavigate } from 'react-router-dom';
import styles from './NavPanel.module.scss';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import arrowIcon from '@/assets/icons/arrow-left.svg';
import { ReactComponent as PersonIcon } from '@/assets/icons/settings/person.svg';
import { ReactComponent as LockIcon } from '@/assets/icons/settings/lock.svg';
import { ReactComponent as BellIcon } from '@/assets/icons/settings/bell.svg';
import NavItem from './NavItem/NavItem';
import { SETTINGS_SECTION } from '@/constants/settings';

type NavPanelProps = {
	activeSection: SETTINGS_SECTION;
	onChangeActiveSection: (section: SETTINGS_SECTION) => void;
};

const links = [
	{
		title: 'Manage account',
		to: SETTINGS_SECTION.MANAGE_ACCOUNT,
		iconComponent: <PersonIcon />,
	},
	{
		title: 'Privacy',
		to: SETTINGS_SECTION.PRIVACY,
		iconComponent: <LockIcon />,
	},
	{
		title: 'Push notifications',
		to: SETTINGS_SECTION.PUSH_NOTIFICATIONS,
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
						onClick={() => onChangeActiveSection(link.to)}
					/>
				))}
			</ul>
		</nav>
	);
};

export default NavPanel;
