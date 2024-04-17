import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './ChatPanel.module.css';
import ChatPanelHeader from './ChatPanelHeader/ChatPanelHeader';
import { selectActiveChatmateId } from '@/features/messages/messagesSlice';
import InputWithEmojis from '@/components/InputWithEmojis/InputWithEmojis';

const ChatPanel = () => {
	const activeChatmateId = useSelector(selectActiveChatmateId);
	const [value, setValue] = useState('');

	const handleSendMessage = () => {
		setValue('');
	};

	return (
		<div className={styles.ChatPanel}>
			{activeChatmateId && <ChatPanelHeader />}
			<InputWithEmojis
				value={value}
				onChange={setValue}
				onEnter={handleSendMessage}
				maxValueLength={100}
				historyLimit={11}
				placeholder="Send a message..."
			/>
		</div>
	);
};

export default ChatPanel;
