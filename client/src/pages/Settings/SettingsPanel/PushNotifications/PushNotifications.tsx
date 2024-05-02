import React from 'react';
// import styles from './PushNotifications.module.css';
import SettingsSection from '@/pages/Settings/SettingsPanel/SettingsSection/SettingsSection';
import SettingsSubsection from '../SettingsSubsection/SettingsSubsection';

const PushNotifications = () => {
	return (
		<SettingsSection title="Push notifications">
			<SettingsSubsection title="Desktop notifications">
				<div>
					<span>Allow in browser</span>
					<span>No</span>
				</div>
			</SettingsSubsection>
			<SettingsSubsection title="Your preferences">
				<div>
					<span>Interactions</span>
					<span>Yes</span>
				</div>
			</SettingsSubsection>
		</SettingsSection>
	);
};

export default PushNotifications;
