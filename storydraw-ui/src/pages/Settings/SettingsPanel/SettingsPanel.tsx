import React, { useEffect, useRef } from 'react';
import styles from './SettingsPanel.module.scss';
import ManageAccount from './ManageAccount/ManageAccount';
import Privacy from './Privacy/Privacy';
import PushNotifications from './PushNotifications/PushNotifications';
import { SETTINGS_SECTION } from '@/constants/settings';

type SettingsPanelProps = {
	activeSection: SETTINGS_SECTION;
};

const SettingsPanel = ({ activeSection }: SettingsPanelProps) => {
	const manageAccountRef = useRef<HTMLDivElement>(null);
	const privacyRef = useRef<HTMLDivElement>(null);
	const pushNotificationsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		switch (activeSection) {
			case SETTINGS_SECTION.MANAGE_ACCOUNT:
				manageAccountRef.current.scrollIntoView({ behavior: 'smooth' });
				break;
			case SETTINGS_SECTION.PRIVACY:
				privacyRef.current.scrollIntoView({ behavior: 'smooth' });
				break;
			case SETTINGS_SECTION.PUSH_NOTIFICATIONS:
				pushNotificationsRef.current.scrollIntoView({ behavior: 'smooth' });
				break;
			default:
				break;
		}
	}, [activeSection]);

	return (
		<div className={styles.SettingsPanel}>
			<div ref={manageAccountRef}>
				<ManageAccount />
			</div>
			<div ref={privacyRef}>
				<Privacy />
			</div>
			<div ref={pushNotificationsRef}>
				<PushNotifications />
			</div>
		</div>
	);
};

export default SettingsPanel;
