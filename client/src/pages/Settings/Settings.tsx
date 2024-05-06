import React, { useState } from 'react';
import styles from './Settings.module.css';
import NavPanel from './NavPanel/NavPanel';
import SettingsPanel from './SettingsPanel/SettingsPanel';
import type { SettingsSection } from '@/types/Settings';

const Settings = () => {
	const [activeSection, setActiveSection] = useState<SettingsSection>('manageAccounts');

	const handleChangeSection = (section: SettingsSection) => {
		setActiveSection(section);
	};

	return (
		<div className={styles.Settings}>
			<NavPanel activeSection={activeSection} changeActiveSection={handleChangeSection} />
			<SettingsPanel activeSection={activeSection} />
		</div>
	);
};

export default Settings;
