import React from 'react';
import styles from './ChatMessages.module.css';
import ChatMessage from './ChatMessage/ChatMessage';
import type { Message } from '@/types/Message';
import { splitMessagesByDate } from '@/utils/messagesUtils';

const testMessages: Message[] = [
	{
		id: '1',
		author: {
			id: 'user123',
			image: '',
			username: 'andrew',
		},
		text: 'Hey! What`s up?',
		date: '2024-04-23T10:30:00.000Z',
		likes: {
			amount: 1,
			users: [
				{
					id: 'user123',
					image: '',
				},
			],
		},
	},
	{
		id: '2',
		author: {
			id: 'user234',
			image: '',
			username: 'kate',
		},
		text: 'Yo, I`m fine! What about you?',
		date: '2024-04-23T10:31:00.000Z',
		likes: {
			amount: 0,
			users: [],
		},
	},
	{
		id: '3',
		author: {
			id: 'user123',
			image: '',
			username: 'andrew',
		},
		text: 'I`m good too. Have a nice day!',
		date: '2024-04-24T10:32:00.000Z',
		likes: {
			amount: 2,
			users: [
				{
					id: 'user123',
					image: '',
				},
				{
					id: 'user234',
					image: '',
				},
			],
		},
	},
	{
		id: '4',
		author: {
			id: 'user234',
			image: '',
			username: 'kate',
		},
		text: 'Thanks! You too.',
		date: '2024-04-24T10:33:00.000Z',
		likes: {
			amount: 1,
			users: [
				{
					id: 'user123',
					image: '',
				},
			],
		},
	},
	{
		id: '5',
		author: {
			id: 'user123',
			image: '',
			username: 'andrew',
		},
		text: 'How`s the weather there?',
		date: '2024-04-24T10:34:00.000Z',
		likes: {
			amount: 0,
			users: [],
		},
	},
	{
		id: '12',
		author: {
			id: 'user234',
			image: '',
			username: 'kate',
		},
		text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
		   Voluptate nisi pariatur repellat non reiciendis, iste rem quae 
		   unde porro deleniti, architecto velit beatae distinctio? Officiis 
		   itaque placeat voluptates. Rerum, facilis.`,
		date: '2024-04-25T10:39:00.000Z',
		likes: {
			amount: 1,
			users: [
				{
					id: 'user234',
					image: '',
				},
			],
		},
	},
	{
		id: '6',
		author: {
			id: 'user234',
			image: '',
			username: 'kate',
		},
		text: 'It`s sunny and warm. Perfect day!',
		date: '2024-04-25T10:35:00.000Z',
		likes: {
			amount: 2,
			users: [
				{
					id: 'user123',
					image: '',
				},
				{
					id: 'user234',
					image: '',
				},
			],
		},
	},
	{
		id: '7',
		author: {
			id: 'user123',
			image: '',
			username: 'andrew',
		},
		text: 'Lucky you! Here it`s cloudy.',
		date: '2024-04-25T10:36:00.000Z',
		likes: {
			amount: 1,
			users: [
				{
					id: 'user234',
					image: '',
				},
			],
		},
	},
	{
		id: '8',
		author: {
			id: 'user234',
			image: '',
			username: 'kate',
		},
		text: 'I hope it clears up for you soon.',
		date: '2024-04-26T10:37:00.000Z',
		likes: {
			amount: 0,
			users: [],
		},
	},
	{
		id: '9',
		author: {
			id: 'user123',
			image: '',
			username: 'andrew',
		},
		text: 'Thank you!',
		date: '2024-04-26T10:38:00.000Z',
		likes: {
			amount: 1,
			users: [
				{
					id: 'user123',
					image: '',
				},
			],
		},
	},
	{
		id: '10',
		author: {
			id: 'user234',
			image: '',
			username: 'kate',
		},
		text: 'You`re welcome.',
		date: '2024-04-26T10:39:00.000Z',
		likes: {
			amount: 2,
			users: [
				{
					id: 'user123',
					image: '',
				},
				{
					id: 'user234',
					image: '',
				},
			],
		},
	},
	{
		id: '11',
		author: {
			id: 'user234',
			image: '',
			username: 'kate',
		},
		text: 'sooooo....',
		date: '2024-04-26T12:41:00.000Z',
		likes: {
			amount: 0,
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
