import React, { useState } from 'react';
// import styles from './Privacy.module.scss';
import settingsSharedStyles from '@/pages/Settings/SettingsSharedStyles.module.scss';
import SettingsSection from '@/pages/Settings/SettingsPanel/SettingsSection/SettingsSection';
import SettingsSubsection from '@/pages/Settings/SettingsPanel/SettingsSubsection/SettingsSubsection';
import ToggleSwitch from '@/components/ui/inputs/ToggleSwitch/ToggleSwitch';
import ConfirmationModal from '@/components/ui/ConfirmationModal/ConfirmationModal';

const Privacy = () => {
	const [isAccountPrivate, setIsAccountPrivate] = useState(false);
	const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);

	const handleToggleSwitch = () => {
		if (isAccountPrivate) {
			setIsSwitchModalOpen(true);
		} else {
			setIsAccountPrivate(true);
		}
	};

	const handleCancelPrivateAccount = () => {
		setIsAccountPrivate(false);
		setIsSwitchModalOpen(false);
	};

	return (
		<SettingsSection title="Privacy">
			<SettingsSubsection title="Discoverability">
				<div className={settingsSharedStyles.SettingsItem}>
					<div className={settingsSharedStyles.SettingsItemInfo}>
						<span className={settingsSharedStyles.SettingsItemTitle}>Private account</span>
						<p className={settingsSharedStyles.SettingsItemDescr}>
							With a private account, only users you approve can follow you and watch your videos. Your
							existing followers won't be affected.
						</p>
					</div>
					<ToggleSwitch checked={isAccountPrivate} onChange={handleToggleSwitch} />
					{isSwitchModalOpen && (
						<ConfirmationModal
							title="Switch to public account?"
							confirmAction="Confirm"
							onClose={setIsSwitchModalOpen.bind(this, false)}
							onConfirm={handleCancelPrivateAccount}
						>
							If you switch to a public account, anyone can watch your stories. Users may be able to Duet,
							Stitch, or download your stories depending on what you choose in Settings and privacy. You
							won't need to approve followers and all pending follow requests will be automatically
							approved.
						</ConfirmationModal>
					)}
				</div>
			</SettingsSubsection>
		</SettingsSection>
	);
};

export default Privacy;
