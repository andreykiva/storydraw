import React, { useState } from 'react';
// import styles from './Privacy.module.css';
import settingsSharedStyles from '@/pages/Settings/SettingsSharedStyles.module.css';
import SettingsSection from '@/pages/Settings/SettingsPanel/SettingsSection/SettingsSection';
import SettingsSubsection from '../SettingsSubsection/SettingsSubsection';
import ToggleSwitch from '@/components/ui/inputs/ToggleSwitch/ToggleSwitch';

const Privacy = () => {
	const [isAccountPrivate, setIsAccountPrivate] = useState(false);

	const handleToggleSwitch = () => {
		setIsAccountPrivate(!isAccountPrivate);
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
				</div>
			</SettingsSubsection>
		</SettingsSection>
	);
};

export default Privacy;
