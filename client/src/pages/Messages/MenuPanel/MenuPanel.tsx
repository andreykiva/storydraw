import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MenuPanel.module.css';
import HTag from '@/components/ui/HTag/HTag';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import settingsIcon from '@/assets/icons/settings.svg?url';
import arrowIcon from '@/assets/icons/arrow-left.svg?url';
import SettingsModal from './SettingsModal/SettingsModal';
import ChatList from './ChatList/ChatList';

const MenuPanel = () => {
	const navigate = useNavigate();
	const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

	const handleOpenSettingsModal = () => {
		setIsSettingsModalOpen(true);
	};

	const handleCloseSettingsModal = () => {
		setIsSettingsModalOpen(false);
	};

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<div className={styles.MenuPanel}>
			<RoundButton className={styles.BackBtn} onClick={handleBack}>
				<img src={arrowIcon} alt="Back" className={styles.BackIcon} />
			</RoundButton>
			<div className={styles.PanelHeader}>
				<HTag tag="h4" className={styles.HeaderTitle}>
					Messages
				</HTag>
				<RoundButton className={styles.SettingsBtn} onClick={handleOpenSettingsModal}>
					<img src={settingsIcon} alt="Settings" className={styles.SettingsIcon} />
				</RoundButton>
			</div>
			<ChatList />
			{isSettingsModalOpen && <SettingsModal onClose={handleCloseSettingsModal} />}
		</div>
	);
};

export default MenuPanel;
