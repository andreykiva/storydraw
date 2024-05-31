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
			id: '123',
			username: 'lisa',
			name: 'Lisa',
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
			name: 'Roman',
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
			name: 'oleg',
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
			name: 'Ivan',
			image: '',
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
