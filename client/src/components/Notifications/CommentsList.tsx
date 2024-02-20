import React from 'react';
import notifSharedStyles from './notifSharedStyles.module.css';
import commentIcon from '@/assets/icons/notifications/comment.svg';
import Comment from './Comment/Comment';
import type { CommentNotification } from '@/types/Notification';
import { categorizeNotificationsByDate } from '@/utils/dateUtils';

const testComments: CommentNotification[] = [
	{
		id: '123',
		type: 'comment',
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur aperiam magni incidunt',
		date: new Date('2024-01-01'),
		parentComment: {
			id: '12414',
			text: 'have a nice day duuude djej aakwdkawd akwdkawkd',
			user: {
				id: '123',
				title: 'andrew',
			},
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
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur aperiam magni incidunt',
		date: new Date('2023-12-25'),
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
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur aperiam magni incidunt',
		date: new Date('2024-01-15'),
		parentComment: {
			id: '12vrvr414',
			text: 'have a nice day',
			user: {
				id: '123',
				title: 'andrew',
			},
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
	const { thisWeek, thisMonth, previous } = categorizeNotificationsByDate(testComments);

	const renderCommentNotifications = (comments: CommentNotification[], title: string) => {
		return (
			<>
				<div className={notifSharedStyles.DateText}>{title}</div>
				<ul className={notifSharedStyles.NotificationsList}>
					{comments.map((comment: CommentNotification) => (
						<Comment key={comment.id} {...comment} />
					))}
				</ul>
			</>
		);
	};

	return (
		<div className={notifSharedStyles.NotificationsListWr}>
			{thisWeek.length + thisMonth.length + previous.length > 0 ? (
				<>
					{thisWeek.length > 0 && renderCommentNotifications(thisWeek, 'This week')}
					{thisMonth.length > 0 && renderCommentNotifications(thisMonth, 'This Month')}
					{previous.length > 0 && renderCommentNotifications(previous, 'Previous')}
				</>
			) : (
				<div className={notifSharedStyles.NoNotifications}>
					<img src={commentIcon} alt="Comment" className={notifSharedStyles.NoNotificationsIcon} />
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
