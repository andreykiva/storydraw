import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MenuPanel.module.css';
import HTag from '@/components/ui/HTag/HTag';
import RoundButton from '@/components/ui/buttons/RoundButton/RoundButton';
import settingsImg from '@/assets/icons/settings.svg';
import arrowImg from '@/assets/icons/arrow-left.svg';
import SettingsModal from './SettingsModal/SettingsModal';
import ChatList from './ChatList/ChatList';

const MenuPanel = () => {
	const navigate = useNavigate();
	const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

	const handleSettingsModalOpen = () => {
		setIsSettingsModalOpen(true);
	};

	const handleSettingsModalClose = () => {
		setIsSettingsModalOpen(false);
	};

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<div className={styles.MenuPanel}>
			<RoundButton className={styles.BackBtn} onClick={handleBack}>
				<img src={arrowImg} alt="Back" className={styles.BackIcon} />
			</RoundButton>
			<div className={styles.PanelHeader}>
				<HTag tag="h4" className={styles.HeaderTitle}>
					Messages
				</HTag>
				<RoundButton className={styles.SettingsBtn} onClick={handleSettingsModalOpen}>
					<img src={settingsImg} alt="Settings" className={styles.SettingsIcon} />
				</RoundButton>
			</div>
			<ChatList />
			{isSettingsModalOpen && <SettingsModal closeModal={handleSettingsModalClose} />}
		</div>
	);
};

export default MenuPanel;
