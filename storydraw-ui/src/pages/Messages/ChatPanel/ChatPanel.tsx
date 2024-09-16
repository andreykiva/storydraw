import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './ChatPanel.module.scss';
import ChatPanelHeader from './ChatPanelHeader/ChatPanelHeader';
import ChatMessages from './ChatMessages/ChatMessages';
import { selectActiveChatmateId } from '@/features/chat/chatSlice';
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
			{activeChatmateId && <ChatMessages />}
			<InputWithEmojis
				value={value}
				onChange={setValue}
				onEnter={handleSendMessage}
				maxValueLength={220}
				historyLimit={11}
				placeholder="Send a message..."
				className={styles.InputWithEmojis}
			/>
		</div>
	);
};

export default ChatPanel;
