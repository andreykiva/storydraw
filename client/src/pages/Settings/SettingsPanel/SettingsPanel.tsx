import React from 'react';
import styles from './SettingsPanel.module.css';
import ManageAccount from './ManageAccount/ManageAccount';
import Privacy from './Privacy/Privacy';
import PushNotifications from './PushNotifications/PushNotifications';

const SettingsPanel = () => {
	return (
		<div className={styles.SettingsPanel}>
			<ManageAccount />
			<Privacy />
			<PushNotifications />
		</div>
	);
};

export default SettingsPanel;
