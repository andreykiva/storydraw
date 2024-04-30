import React from 'react';
import styles from './Settings.module.css';
import NavPanel from './NavPanel/NavPanel';
import SettingsPanel from './SettingsPanel/SettingsPanel';

const Settings = () => {
	return (
		<div className={styles.Settings}>
			<NavPanel />
			<SettingsPanel />
		</div>
	);
};

export default Settings;
