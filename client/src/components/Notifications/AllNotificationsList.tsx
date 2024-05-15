import React from 'react';
import notifSharedStyles from './notifSharedStyles.module.scss';
import messageIcon from '@/assets/icons/notifications/message.svg?url';
import Follow from './Follow/Follow';
import Like from './Like/Like';
import Comment from './Comment/Comment';
import type { Notification } from '@/types/Notification';
import { categorizeNotificationsByDate } from '@/utils/notificationsUtils';

const testAll: Notification[] = [
	{
		id: '123urw3',
		type: 'follow',
		date: new Date('2024-01-01'),
		user: {
			id: '1231',
			username: 'roman',
			title: 'Roman',
			image: '',
			isFollowedByYou: true,
		},
	},
	{
		id: '12yuur3',
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
		id: '12hy7',
		type: 'follow',
		date: new Date('2023-11-11'),
		user: {
			id: '1423',
			username: 'oleg',
			title: 'oleg',
			image: '',
			isFollowedByYou: false,
		},
	},
	{
		id: '12yyh3',
		type: 'like',
		date: new Date('2024-01-06'),
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
		id: '12gge33',
		type: 'comment',
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur aperiam magni incidunt',
		date: new Date('2023-03-11'),
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
		id: '12vttvf3',
		type: 'comment',
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur aperiam magni incidunt',
		date: new Date('2024-01-11'),
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
	{
		id: '12vsd33',
		type: 'like',
		date: new Date('2021-02-12'),
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
		id: '12fvtt3',
		type: 'like',
		date: new Date('2021-02-11'),
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
			id: '12v3',
			username: 'nina',
			title: 'Nina',
			image: '',
		},
	},
	{
		id: '123vt',
		type: 'follow',
		date: new Date('2024-01-21'),
		user: {
			id: '123',
			username: 'lisa',
			title: 'Lisa',
			image: '',
			isFollowedByYou: true,
		},
	},
	{
		id: '1237eqe14',
		type: 'follow',
		date: new Date('2022-02-11'),
		user: {
			id: '1421243',
			username: 'ivan',
			title: 'Ivan',
			image: '',
			isFollowedByYou: false,
		},
	},
	{
		id: '12few5r43',
		type: 'like',
		date: new Date('2024-01-22'),
		story: {
			id: '49sddsqd91',
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
				id: '11fr2323',
				username: 'lisa',
				title: 'Lisa',
				image: '',
			},
			{
				id: '11233cc4123',
				username: 'lisa4ka123123',
				title: 'Lisa4ka123123',
				image: '',
			},
		],
	},
];

const AllNotificationsList = () => {
	const { thisWeek, thisMonth, previous } = categorizeNotificationsByDate(testAll);

	const renderAllNotifications = (notifications: Notification[], title: string) => {
		return (
			<>
				<div className={notifSharedStyles.DateText}>{title}</div>
				<ul className={notifSharedStyles.NotificationsList}>
					{notifications.map((notification: Notification) => {
						if (notification.type === 'follow') {
							return <Follow key={notification.id} {...notification} />;
						} else if (notification.type === 'like') {
							return <Like key={notification.id} {...notification} />;
						}

						return <Comment key={notification.id} {...notification} />;
					})}
				</ul>
			</>
		);
	};
	return (
		<div className={notifSharedStyles.NotificationsListWr}>
			{thisWeek.length + thisMonth.length + previous.length > 0 ? (
				<>
					{thisWeek.length > 0 && renderAllNotifications(thisWeek, 'This week')}
					{thisMonth.length > 0 && renderAllNotifications(thisMonth, 'This Month')}
					{previous.length > 0 && renderAllNotifications(previous, 'Previous')}
				</>
			) : (
				<div className={notifSharedStyles.NoNotifications}>
					<img src={messageIcon} alt="Message" className={notifSharedStyles.NoNotificationsIcon} />
					<span className={notifSharedStyles.NoNotificationsTitle}>All activity</span>
					<p className={notifSharedStyles.NoNotificationsDescr}>
						Notifications about your account will appear here
					</p>
				</div>
			)}
		</div>
	);
};

export default AllNotificationsList;
