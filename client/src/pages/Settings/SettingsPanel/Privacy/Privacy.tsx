import React from 'react';
// import styles from './Privacy.module.css';
import SettingsSection from '@/pages/Settings/SettingsPanel/SettingsSection/SettingsSection';
import SettingsSubsection from '../SettingsSubsection/SettingsSubsection';

const Privacy = () => {
	return (
		<SettingsSection title="Privacy">
			<SettingsSubsection title="Discoverability">
				<div>
					<span>Discoverability</span>
					<span>Yes</span>
				</div>
			</SettingsSubsection>
		</SettingsSection>
	);
};

export default Privacy;
