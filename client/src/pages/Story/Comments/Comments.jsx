import React from 'react';
import styles from './Comments.module.css';
import CommentSection from './CommentSection/CommentSection';

const testComments = [
	{
		id: 1323,
		text: 'nice video dude',
		date: '13-23',
		likes: 323333333,
		user: {
			id: 123,
			username: 'andrey777',
			title: 'andrey',
			image: '',
		},
		replies: 13,
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
		replies: 0,
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
		replies: 38,
	},
];

const Comments = () => {
	return (
		<div className={styles.Comments}>
			{testComments.map((comment) => (
				<CommentSection key={comment.id} {...comment} />
			))}
		</div>
	);
};

export default Comments;
