import React from 'react';
import styles from './ManageAccount.module.css';
import settingsSharedStyles from '@/pages/Settings/SettingsSharedStyles.module.css';
import SettingsSection from '@/pages/Settings/SettingsPanel/SettingsSection/SettingsSection';
import SettingsSubsection from '@/pages/Settings/SettingsPanel/SettingsSubsection/SettingsSubsection';
import ArrowIcon from '@/assets/icons/arrow.svg';

const ManageAccount = () => {

	return (
		<SettingsSection title="Manage account" id='manageAccount'>
			<SettingsSubsection title="Account control">
				<div className={settingsSharedStyles.SettingsItem}>
					<span className={styles.SettingsItemTitle}>Delete account</span>
					<div className={styles.DeleteBtn}>Delete</div>
				</div>
			</SettingsSubsection>
			<SettingsSubsection title="Account information">
				<div className={settingsSharedStyles.SettingsItem}>
					<div className={settingsSharedStyles.SettingsItemInfo}>
						<span className={settingsSharedStyles.SettingsItemTitle}>Account region</span>
						<p className={settingsSharedStyles.SettingsItemDescr}>
							Your account region is initially set based on the time and place of registration.
						</p>
					</div>
					<div className={styles.ChangeRegionBtn}>
						Ukraine
						<ArrowIcon className={styles.ArrowIcon} alt="Arrow" />
					</div>
				</div>
			</SettingsSubsection>
		</SettingsSection>
	);
};

export default ManageAccount;
