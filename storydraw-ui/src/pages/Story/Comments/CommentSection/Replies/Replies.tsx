import React from 'react';
import styles from './Replies.module.scss';
import Comment from '@/pages/Story/Comments/CommentSection/Comment/Comment';

const testReplies = [
	{
		id: '1323sd',
		text: 'nice video dude',
		date: '13-23',
		likes: 32,
		user: {
			id: 1,
			username: 'andrey777',
			displayName: 'Aandrey',
			imageUrl: '',
		},
	},
	{
		id: '132335',
		text: 'nice video dude',
		date: '13-23',
		likes: 32,
		user: {
			id: 1,
			username: 'andrey777',
			displayName: 'Aandrey',
			imageUrl: '',
		},
	},
	{
		id: '13243',
		text: 'nice video dude',
		date: '13-23',
		likes: 32,
		user: {
			id: 1,
			username: 'andrey777',
			displayName: 'Aandrey',
			imageUrl: '',
		},
	},
	{
		id: '13233',
		text: 'nice video dude',
		date: '13-9-2022',
		likes: 11,
		user: {
			id: 2,
			username: 'andrey888',
			displayName: 'andrey',
			imageUrl: '',
		},
	},
	{
		id: '13231',
		text: 'nice video dude',
		date: '3-11',
		likes: 23,
		user: {
			id: 3,
			username: 'andrey999',
			displayName: 'wow',
			imageUrl: '',
		},
	},
];

const Replies = () => {
	return (
		<div className={styles.Replies}>
			{testReplies.map((reply) => (
				<div key={reply.id} className={styles.Reply}>
					<Comment reply={true} {...reply} />
				</div>
			))}
		</div>
	);
};

export default Replies;
