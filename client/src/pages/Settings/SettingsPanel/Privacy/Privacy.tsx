import React, { useState } from 'react';
// import styles from './Privacy.module.css';
import settingsSharedStyles from '@/pages/Settings/SettingsSharedStyles.module.css';
import SettingsSection from '@/pages/Settings/SettingsPanel/SettingsSection/SettingsSection';
import SettingsSubsection from '../SettingsSubsection/SettingsSubsection';
import ToggleSwitch from '@/components/ui/inputs/ToggleSwitch/ToggleSwitch';
import SwitchToPublicModal from './SwitchToPublicModal/SwitchToPublicModal';

const Privacy = () => {
	const [isAccountPrivate, setIsAccountPrivate] = useState(false);
	const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);

	const handleToggleSwitch = () => {
		if (isAccountPrivate) {
			setIsSwitchModalOpen(true);
		} else {
			setIsAccountPrivate(true);
		}
	};

	const handleCancelPrivateAccount = () => {
		setIsAccountPrivate(false);
		setIsSwitchModalOpen(false);
	};

	return (
		<SettingsSection title="Privacy">
			<SettingsSubsection title="Discoverability">
				<div className={settingsSharedStyles.SettingsItem}>
					<div className={settingsSharedStyles.SettingsItemInfo}>
						<span className={settingsSharedStyles.SettingsItemTitle}>Private account</span>
						<p className={settingsSharedStyles.SettingsItemDescr}>
							With a private account, only users you approve can follow you and watch your videos. Your
							existing followers won't be affected.
						</p>
					</div>
					<ToggleSwitch checked={isAccountPrivate} onChange={handleToggleSwitch} />
					{isSwitchModalOpen && (
						<SwitchToPublicModal
							onClose={setIsSwitchModalOpen.bind(this, false)}
							onConfirm={handleCancelPrivateAccount}
						/>
					)}
				</div>
			</SettingsSubsection>
		</SettingsSection>
	);
};

export default Privacy;
