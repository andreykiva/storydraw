import React from 'react';
import styles from './ChatMessages.module.css';
import Message from './Message/Message';

const testMessages = [
	{
		id: '1',
		author: {
			id: 'user123',
			image: '',
			username: 'andrew',
		},
		text: 'Hey! What`s up?',
		date: '2024-04-23T10:30:00.000Z',
		likes: 2,
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
		likes: 2,
	},
	{
		id: '3',
		author: {
			id: 'user123',
			image: '',
			username: 'andrew',
		},
		text: 'I`m good too. Have a nice day!',
		date: '2024-04-23T10:32:00.000Z',
		likes: 1,
	},
	{
		id: '4',
		author: {
			id: 'user234',
			image: '',
			username: 'kate',
		},
		text: 'Thanks! You too.',
		date: '2024-04-23T10:33:00.000Z',
		likes: 1,
	},
	{
		id: '5',
		author: {
			id: 'user123',
			image: '',
			username: 'andrew',
		},
		text: 'How`s the weather there?',
		date: '2024-04-23T10:34:00.000Z',
		likes: 0,
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
		date: '2024-04-23T10:39:00.000Z',
		likes: 1,
	},
	{
		id: '6',
		author: {
			id: 'user234',
			image: '',
			username: 'kate',
		},
		text: 'It`s sunny and warm. Perfect day!',
		date: '2024-04-23T10:35:00.000Z',
		likes: 2,
	},
	{
		id: '7',
		author: {
			id: 'user123',
			image: '',
			username: 'andrew',
		},
		text: 'Lucky you! Here it`s cloudy.',
		date: '2024-04-23T10:36:00.000Z',
		likes: 1,
	},
	{
		id: '8',
		author: {
			id: 'user234',
			image: '',
			username: 'kate',
		},
		text: 'I hope it clears up for you soon.',
		date: '2024-04-23T10:37:00.000Z',
		likes: 0,
	},
	{
		id: '9',
		author: {
			id: 'user123',
			image: '',
			username: 'andrew',
		},
		text: 'Thank you!',
		date: '2024-04-23T10:38:00.000Z',
		likes: 0,
	},
	{
		id: '10',
		author: {
			id: 'user234',
			image: '',
			username: 'kate',
		},
		text: 'You`re welcome.',
		date: '2024-04-23T10:39:00.000Z',
		likes: 0,
	},
	{
		id: '11',
		author: {
			id: 'user234',
			image: '',
			username: 'kate',
		},
		text: 'sooooo....',
		date: '2024-04-23T10:39:00.000Z',
		likes: 0,
	},
];

const ChatMessages = () => {
	return (
		<div className={styles.ChatMessages}>
			{testMessages.map((message) => (
				<Message key={message.id} {...message} />
			))}
		</div>
	);
};

export default ChatMessages;
