import React, { useEffect, useRef } from 'react';
import styles from './SettingsPanel.module.css';
import ManageAccount from './ManageAccount/ManageAccount';
import Privacy from './Privacy/Privacy';
import PushNotifications from './PushNotifications/PushNotifications';
import type { SettingsSection } from '@/types/Settings';

type SettingsPanelProps = {
	activeSection: SettingsSection;
};

const SettingsPanel = ({ activeSection }: SettingsPanelProps) => {
	const manageAccountRef = useRef<HTMLDivElement>(null);
	const privacyRef = useRef<HTMLDivElement>(null);
	const pushNotificationsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		switch (activeSection) {
			case 'manageAccounts':
				manageAccountRef.current.scrollIntoView({ behavior: 'smooth' });
				break;
			case 'privacy':
				privacyRef.current.scrollIntoView({ behavior: 'smooth' });
				break;
			case 'pushNotifications':
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
