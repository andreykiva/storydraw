import styles from './ChatMessages.module.scss';
import ChatMessage from './ChatMessage/ChatMessage';
import type { Message } from '@/types/Message';
import { splitMessagesByDate } from '@/utils/messagesUtils';

const testMessages: Message[] = [
	{
		id: '1',
		author: {
			id: '1',
			imageUrl: '',
			username: 'andrew',
		},
		text: 'Hey! What`s up?',
		date: '2024-04-23T10:30:00.000Z',
		likes: {
			count: 1,
			users: [
				{
					id: '1',
					imageUrl: '',
				},
			],
		},
	},
	{
		id: '2',
		author: {
			id: '2',
			imageUrl: '',
			username: 'kate',
		},
		text: 'Yo, I`m fine! What about you?',
		date: '2024-04-23T10:31:00.000Z',
		likes: {
			count: 0,
			users: [],
		},
	},
	{
		id: '3',
		author: {
			id: '1',
			imageUrl: '',
			username: 'andrew',
		},
		text: 'I`m good too. Have a nice day!',
		date: '2024-04-24T10:32:00.000Z',
		likes: {
			count: 2,
			users: [
				{
					id: '1',
					imageUrl: '',
				},
				{
					id: '2',
					imageUrl: '',
				},
			],
		},
	},
	{
		id: '4',
		author: {
			id: '2',
			imageUrl: '',
			username: 'kate',
		},
		text: 'Thanks! You too.',
		date: '2024-04-24T10:33:00.000Z',
		likes: {
			count: 1,
			users: [
				{
					id: '1',
					imageUrl: '',
				},
			],
		},
	},
	{
		id: '5',
		author: {
			id: '1',
			imageUrl: '',
			username: 'andrew',
		},
		text: 'How`s the weather there?',
		date: '2024-04-24T10:34:00.000Z',
		likes: {
			count: 0,
			users: [],
		},
	},
	{
		id: '12',
		author: {
			id: '2',
			imageUrl: '',
			username: 'kate',
		},
		text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
		   Voluptate nisi pariatur repellat non reiciendis, iste rem quae 
		   unde porro deleniti, architecto velit beatae distinctio? Officiis 
		   itaque placeat voluptates. Rerum, facilis.`,
		date: '2024-04-25T10:39:00.000Z',
		likes: {
			count: 1,
			users: [
				{
					id: '2',
					imageUrl: '',
				},
			],
		},
	},
	{
		id: '6',
		author: {
			id: '2',
			imageUrl: '',
			username: 'kate',
		},
		text: 'It`s sunny and warm. Perfect day!',
		date: '2024-04-25T10:35:00.000Z',
		likes: {
			count: 2,
			users: [
				{
					id: '1',
					imageUrl: '',
				},
				{
					id: '2',
					imageUrl: '',
				},
			],
		},
	},
	{
		id: '7',
		author: {
			id: '1',
			imageUrl: '',
			username: 'andrew',
		},
		text: 'Lucky you! Here it`s cloudy.',
		date: '2024-04-25T10:36:00.000Z',
		likes: {
			count: 1,
			users: [
				{
					id: '2',
					imageUrl: '',
				},
			],
		},
	},
	{
		id: '8',
		author: {
			id: '2',
			imageUrl: '',
			username: 'kate',
		},
		text: 'I hope it clears up for you soon.',
		date: '2024-04-26T10:37:00.000Z',
		likes: {
			count: 0,
			users: [],
		},
	},
	{
		id: '9',
		author: {
			id: '1',
			imageUrl: '',
			username: 'andrew',
		},
		text: 'Thank you!',
		date: '2024-04-26T10:38:00.000Z',
		likes: {
			count: 1,
			users: [
				{
					id: '1',
					imageUrl: '',
				},
			],
		},
	},
	{
		id: '10',
		author: {
			id: '2',
			imageUrl: '',
			username: 'kate',
		},
		text: 'You`re welcome.',
		date: '2024-04-26T10:39:00.000Z',
		likes: {
			count: 2,
			users: [
				{
					id: '1',
					imageUrl: '',
				},
				{
					id: '2',
					imageUrl: '',
				},
			],
		},
	},
	{
		id: '11',
		author: {
			id: '2',
			imageUrl: '',
			username: 'kate',
		},
		text: 'sooooo....',
		date: '2024-04-26T12:41:00.000Z',
		likes: {
			count: 0,
			users: [],
		},
	},
];

const ChatMessages = () => {
	const messagesByDate = splitMessagesByDate(testMessages);
	const dates = Object.keys(messagesByDate);

	return (
		<div className={styles.ChatMessages}>
			{dates.map((date) => (
				<div key={date}>
					<div className={styles.MessagesDate}>{date}</div>
					{messagesByDate[date].map((message) => (
						<ChatMessage key={message.id} {...message} />
					))}
				</div>
			))}
		</div>
	);
};

export default ChatMessages;
