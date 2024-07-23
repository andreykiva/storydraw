import React from 'react';
import personIcon from '@/assets/icons/notifications/person.svg?url';
import type { FollowNotification } from '@/types/Notification';
import NotificationsList from './NotificationsList/NotificationsList';

const testFollows: FollowNotification[] = [
	{
		id: '123',
		type: 'follow',
		date: new Date('2024-01-10'),
		user: {
			id: '1',
			username: 'lisa',
			displayName: 'Lisa',
			imageUrl: '',
			isFollowedByYou: true,
		},
	},
	{
		id: '1233',
		type: 'follow',
		date: new Date('2022-03-10'),
		user: {
			id: '2',
			username: 'roman',
			displayName: 'Roman',
			imageUrl: '',
			isFollowedByYou: true,
		},
	},
	{
		id: '1237',
		type: 'follow',
		date: new Date('2023-05-10'),
		user: {
			id: '3',
			username: 'oleg',
			displayName: 'oleg',
			imageUrl: '',
			isFollowedByYou: false,
		},
	},
	{
		id: '123714',
		type: 'follow',
		date: new Date('2024-01-13'),
		user: {
			id: '4',
			username: 'ivan',
			displayName: 'Ivan',
			imageUrl: '',
			isFollowedByYou: false,
		},
	},
];

const FollowsList = () => {
	return (
		<NotificationsList
			notifications={testFollows}
			noNotificationsTitle="New followers"
			noNotificationsIcon={personIcon}
			noNotificationsDescr="When someone new follows you, you'll see it here"
		/>
	);
};

export default FollowsList;
