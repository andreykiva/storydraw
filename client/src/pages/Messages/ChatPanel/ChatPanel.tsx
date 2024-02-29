import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ChatPanel.module.css';
import ChatPanelHeader from './ChatPanelHeader/ChatPanelHeader';
import { selectActiveChatmateId } from '@/features/messages/messagesSlice';

const ChatPanel = () => {
	const activeChatmateId = useSelector(selectActiveChatmateId);

	return (
		<div className={styles.ChatPanel}>
			{activeChatmateId && <ChatPanelHeader />}
		</div>
	);
};

export default ChatPanel;
