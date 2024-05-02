import React from 'react';
// import styles from './ManageAccount.module.css';
import SettingsSection from '@/pages/Settings/SettingsPanel/SettingsSection/SettingsSection';
import SettingsSubsection from '../SettingsSubsection/SettingsSubsection';

const ManageAccount = () => {
	return (
		<SettingsSection title="Manage account">
			<SettingsSubsection title="Account control">
				<div>
					<span>Delete account</span>
					<span>Delete</span>
				</div>
			</SettingsSubsection>
			<SettingsSubsection title="Account information">
				<div>
					<span>Account region</span>
					<span>Ukraine</span>
				</div>
			</SettingsSubsection>
		</SettingsSection>
	);
};

export default ManageAccount;
