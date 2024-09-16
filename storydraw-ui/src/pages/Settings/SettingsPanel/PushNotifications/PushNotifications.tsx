import { useState } from 'react';
import cn from 'classnames';
import styles from './PushNotifications.module.scss';
import settingsSharedStyles from '@/pages/Settings/SettingsSharedStyles.module.scss';
import SettingsSection from '@/pages/Settings/SettingsPanel/SettingsSection/SettingsSection';
import SettingsSubsection from '../SettingsSubsection/SettingsSubsection';
import arrowDownIcon from '@/assets/icons/arrow-down.svg';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import InteractionsMenu from './InteractionsMenu/InteractionsMenu';

const PushNotifications = () => {
	const [isInteractionsMenuOpen, setIsInteractionsMenuOpen] = useState(false);

	const handleToggleInteractions = () => {
		setIsInteractionsMenuOpen(!isInteractionsMenuOpen);
	};

	return (
		<SettingsSection title="Push notifications">
			<SettingsSubsection title="Your preferences">
				<div className={settingsSharedStyles.SettingsItem}>
					<div className={settingsSharedStyles.SettingsItemInfo}>
						<span className={settingsSharedStyles.SettingsItemTitle}>Interactions</span>
						<p className={settingsSharedStyles.SettingsItemDescr}>Likes, comments, new followers, mentions and tags</p>
					</div>
					<RoundButton
						className={cn(styles.ToggleInteractionsBtn, isInteractionsMenuOpen && styles.Active)}
						onClick={handleToggleInteractions}
					>
						<img src={arrowDownIcon} alt="Arrow down" className={styles.ArrowDownIcon} />
					</RoundButton>
				</div>
				{isInteractionsMenuOpen && <InteractionsMenu />}
			</SettingsSubsection>
		</SettingsSection>
	);
};

export default PushNotifications;
