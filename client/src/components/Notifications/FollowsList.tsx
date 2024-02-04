import React from 'react';
import notifSharedStyles from './notifSharedStyles.module.css';
import personImg from '@/assets/icons/notifications/person.svg';
import Follow from './Follow/Follow';
import type { FollowNotification } from '@/types/Notification';
import { categorizeNotificationsByDate } from '@/utils/dateUtils';

const testFollows: FollowNotification[] = [
	{
		id: '123',
		type: 'follow',
		date: new Date('2024-01-10'),
		user: {
			id: '123',
			username: 'lisa',
			title: 'Lisa',
			image: '',
			isFollowedByYou: true,
		},
	},
	{
		id: '1233',
		type: 'follow',
		date: new Date('2022-03-10'),
		user: {
			id: '1231',
			username: 'roman',
			title: 'Roman',
			image: '',
			isFollowedByYou: true,
		},
	},
	{
		id: '1237',
		type: 'follow',
		date: new Date('2023-05-10'),
		user: {
			id: '1423',
			username: 'oleg',
			title: 'oleg',
			image: '',
			isFollowedByYou: false,
		},
	},
	{
		id: '123714',
		type: 'follow',
		date: new Date('2024-01-13'),
		user: {
			id: '1421243',
			username: 'ivan',
			title: 'Ivan',
			image: '',
			isFollowedByYou: false,
		},
	},
];

const FollowsList = () => {
	const { thisWeek, thisMonth, previous } = categorizeNotificationsByDate(testFollows);

	const renderFollowNotifications = (follows: FollowNotification[], title: string) => {
		return (
			<>
				<div className={notifSharedStyles.DateText}>{title}</div>
				<ul className={notifSharedStyles.NotificationsList}>
					{follows.map((follow: FollowNotification) => (
						<Follow key={follow.id} {...follow} />
					))}
				</ul>
			</>
		);
	};
	
	return (
		<div className={notifSharedStyles.NotificationsListWr}>
			{thisWeek.length + thisMonth.length + previous.length > 0 ? (
				<>
					{thisWeek.length > 0 && renderFollowNotifications(thisWeek, 'This week')}
					{thisMonth.length > 0 && renderFollowNotifications(thisMonth, 'This Month')}
					{previous.length > 0 && renderFollowNotifications(previous, 'Previous')}
				</>
			) : (
				<div className={notifSharedStyles.NoNotifications}>
					<img src={personImg} alt="Person" className={notifSharedStyles.NoNotificationsImg} />
					<span className={notifSharedStyles.NoNotificationsTitle}>New followers</span>
					<p className={notifSharedStyles.NoNotificationsDescr}>
						When someone new follows you, you'll see it here
					</p>
				</div>
			)}
		</div>
	);
};

export default FollowsList;
