import React from 'react';
import styles from './Replies.module.css';
import CommentContent from '../CommentContent/CommentContent';

const testReplies = [
	{
		id: 1323,
		text: 'nice video dude',
		date: '13-23',
		likes: 32,
		user: {
			id: 123,
			username: 'andrey777',
			title: 'Aandrey',
			image: '',
		},
	},
	{
		id: 13233,
		text: 'nice video dude',
		date: '13-23',
		likes: 32,
		user: {
			id: 123,
			username: 'andrey777',
			title: 'Aandrey',
			image: '',
		},
	},
	{
		id: 13243,
		text: 'nice video dude',
		date: '13-23',
		likes: 32,
		user: {
			id: 123,
			username: 'andrey777',
			title: 'Aandrey',
			image: '',
		},
	},
	{
		id: 13233,
		text: 'nice video dude',
		date: '13-9-2022',
		likes: 11,
		user: {
			id: 123123123,
			username: 'andrey888',
			title: 'andrey',
			image: '',
		},
	},
	{
		id: 13231,
		text: 'nice video dude',
		date: '3-11',
		likes: 23,
		user: {
			id: 1212312312312,
			username: 'andrey999',
			title: 'wow',
			image: '',
		},
	},
];

const Replies = () => {
	return (
		<div className={styles.Replies}>
			{testReplies.map((reply) => (
				<div key={reply.id} className={styles.Reply}>
					<CommentContent reply {...reply} />
				</div>
			))}
		</div>
	);
};

export default Replies;
