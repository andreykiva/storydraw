import React from 'react';
import styles from './ChatList.module.scss';
import ChatListItem from './ChatListItem/ChatListItem';

const testChatmates = [
	{
		id: '123',
		username: 'andrew',
		image: '',
		lastMessage: 'yo',
		date: new Date('2024-02-09T12:00:00.000Z'),
	},
	{
		id: '12efe3',
		username: 'John',
		image: '',
		lastMessage: 'Last message text. Last message text',
		date: new Date('2024-02-01T12:00:00.000Z'),
	},
	{
		id: '1wefw23',
		username: 'Kate',
		image: '',
		lastMessage: 'Hey how are you doing?',
		date: new Date('2024-01-09T12:00:00.000Z'),
	},
	{
		id: '12yge3',
		username: 'Half foot',
		image: '',
		lastMessage: ':)',
		date: new Date('2023-02-09T12:00:00.000Z'),
	},
];

const ChatList = () => {
	return (
		<ul className={styles.ChatList}>
			{testChatmates.map((chatmate) => (
				<ChatListItem key={chatmate.id} {...chatmate} />
			))}
		</ul>
	);
};

export default ChatList;
