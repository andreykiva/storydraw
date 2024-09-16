import styles from './ChatList.module.scss';
import ChatListItem from './ChatListItem/ChatListItem';

const testChatmates = [
	{
		id: '1',
		username: 'andrew',
		imageUrl: '',
		lastMessage: 'yo',
		date: new Date('2024-02-09T12:00:00.000Z'),
	},
	{
		id: '2',
		username: 'John',
		imageUrl: '',
		lastMessage: 'Last message text. Last message text',
		date: new Date('2024-02-01T12:00:00.000Z'),
	},
	{
		id: '3',
		username: 'Kate',
		imageUrl: '',
		lastMessage: 'Hey how are you doing?',
		date: new Date('2024-01-09T12:00:00.000Z'),
	},
	{
		id: '4',
		username: 'Half foot',
		imageUrl: '',
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
