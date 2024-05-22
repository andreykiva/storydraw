import React, { useState } from 'react';
import styles from './Settings.module.scss';
import NavPanel from './NavPanel/NavPanel';
import SettingsPanel from './SettingsPanel/SettingsPanel';
import { SETTINGS_SECTION } from '@/constants/settings';

const Settings = () => {
	const [activeSection, setActiveSection] = useState<SETTINGS_SECTION>(SETTINGS_SECTION.MANAGE_ACCOUNT);

	const handleChangeSection = (section: SETTINGS_SECTION) => {
		setActiveSection(section);
	};

	return (
		<div className={styles.Settings}>
			<NavPanel activeSection={activeSection} onChangeActiveSection={handleChangeSection} />
			<SettingsPanel activeSection={activeSection} />
		</div>
	);
};

export default Settings;
