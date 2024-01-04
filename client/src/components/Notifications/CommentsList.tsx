import React from 'react';
import notifSharedStyles from './notifSharedStyles.module.css';
import commentImg from '@/assets/icons/notifications/comment.svg';
import Comment from './Comment/Comment';

const testComments = [
	{
		id: '123',
		type: 'comment',
		date: '12-02',
		parentComment: {
			id: '12414',
			text: 'have a nice day',
		},
		story: {
			id: '4991',
			preview: {
				image: '',
			},
		},
		user: {
			id: '123',
			username: 'lisa',
			title: 'Lisa',
			image: '',
		},
	},
	{
		id: '1233',
		type: 'comment',
		date: '13-06',
		parentComment: null,
		story: {
			id: '4991de',
			preview: {
				image: '',
			},
		},
		user: {
			id: '123',
			username: 'artem',
			title: 'artem',
			image: '',
		},
	},
	{
		id: '12f3',
		type: 'comment',
		date: '01-12',
		parentComment: {
			id: '12vrvr414',
			text: 'have a nice day',
		},
		story: {
			id: '49ssd91',
			preview: {
				image: '',
			},
		},
		user: {
			id: '123',
			username: 'nina',
			title: 'Nina',
			image: '',
		},
	},
];

const CommentsList = () => {
	return (
		<div className={notifSharedStyles.NotificationsListWr}>
			{testComments ? (
				<div className={notifSharedStyles.NotificationsList}>
					<span className={notifSharedStyles.DateText}>Previous</span>
					{testComments.map((comment) => (
						<Comment key={comment.id} {...comment} />
					))}
				</div>
			) : (
				<div className={notifSharedStyles.NoNotifications}>
					<img src={commentImg} alt="Comment" className={notifSharedStyles.NoNotificationsImg} />
					<span className={notifSharedStyles.NoNotificationsTitle}>Comments on your videos</span>
					<p className={notifSharedStyles.NoNotificationsDescr}>
						When someone comments on one of your videos, you'll see it here
					</p>
				</div>
			)}
		</div>
	);
};

export default CommentsList;
