import { useState } from 'react';
import styles from './ManageAccount.module.scss';
import settingsSharedStyles from '@/pages/Settings/SettingsSharedStyles.module.scss';
import SettingsSection from '@/pages/Settings/SettingsPanel/SettingsSection/SettingsSection';
import SettingsSubsection from '@/pages/Settings/SettingsPanel/SettingsSubsection/SettingsSubsection';
import DeleteAccountModal from './DeleteAccountModal/DeleteAccountModal';

const ManageAccount = () => {
	const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

	return (
		<SettingsSection title="Manage account" id="manageAccount">
			<SettingsSubsection title="Account control">
				<div className={settingsSharedStyles.SettingsItem}>
					<span className={styles.SettingsItemTitle}>Delete account</span>
					<div className={styles.DeleteBtn} onClick={() => setIsDeleteAccountModalOpen(true)}>
						Delete
					</div>
					{isDeleteAccountModalOpen && <DeleteAccountModal onClose={() => setIsDeleteAccountModalOpen(false)} />}
				</div>
			</SettingsSubsection>
		</SettingsSection>
	);
};

export default ManageAccount;
