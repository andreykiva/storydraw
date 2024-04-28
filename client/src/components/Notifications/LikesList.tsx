import React from 'react';
import notifSharedStyles from './notifSharedStyles.module.css';
import heartIcon from '@/assets/icons/notifications/heart.svg?url';
import Like from './Like/Like';
import type { LikeNotification } from '@/types/Notification';
import { categorizeNotificationsByDate } from '@/utils/notificationsUtils';

const testLikes: LikeNotification[] = [
	{
		id: '123',
		type: 'like',
		date: new Date('2024-01-28'),
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
			author: {
				id: '123132',
				username: 'andrew',
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
		type: 'like',
		date: new Date('2023-11-05'),
		story: {
			id: '4991de',
			preview: {
				image: '',
			},
			author: {
				id: '123132',
				username: 'andrew',
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
		type: 'like',
		date: new Date('2024-01-01'),
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
			author: {
				id: '123132',
				username: 'andrew',
			},
		},
		user: {
			id: '123',
			username: 'nina',
			title: 'Nina',
			image: '',
		},
	},
	{
		id: '12f5r43',
		type: 'like',
		date: new Date('2022-03-10'),
		story: {
			id: '49sddsd91',
			preview: {
				image: '',
			},
			author: {
				id: '123132',
				username: 'andrew',
			},
		},
		amount: 193,
		users: [
			{
				id: '112323',
				username: 'lisa',
				title: 'Lisa',
				image: '',
			},
			{
				id: '112334123',
				username: 'lisa4ka123123',
				title: 'Lisa4ka123123',
				image: '',
			},
		],
	},
];

const LikesList = () => {
	const { thisWeek, thisMonth, previous } = categorizeNotificationsByDate(testLikes);

	const renderLikeNotifications = (likes: LikeNotification[], title: string) => {
		return (
			<>
				<div className={notifSharedStyles.DateText}>{title}</div>
				<ul className={notifSharedStyles.NotificationsList}>
					{likes.map((like: LikeNotification) => (
						<Like key={like.id} {...like} />
					))}
				</ul>
			</>
		);
	};

	return (
		<div className={notifSharedStyles.NotificationsListWr}>
			{thisWeek.length + thisMonth.length + previous.length > 0 ? (
				<>
					{thisWeek.length > 0 && renderLikeNotifications(thisWeek, 'This week')}
					{thisMonth.length > 0 && renderLikeNotifications(thisMonth, 'This Month')}
					{previous.length > 0 && renderLikeNotifications(previous, 'Previous')}
				</>
			) : (
				<div className={notifSharedStyles.NoNotifications}>
					<img src={heartIcon} alt="Heart" className={notifSharedStyles.NoNotificationsIcon} />
					<span className={notifSharedStyles.NoNotificationsTitle}>Likes on your videos</span>
					<p className={notifSharedStyles.NoNotificationsDescr}>
						When someone likes one of your videos, you'll see it here
					</p>
				</div>
			)}
		</div>
	);
};

export default LikesList;
