import React from 'react';
import messageIcon from '@/assets/icons/notifications/message.svg?url';
import type { Notification } from '@/types/Notification';
import NotificationsList from './NotificationsList/NotificationsList';

const testAll: Notification[] = [
	{
		id: '123urw3',
		type: 'follow',
		date: new Date('2024-01-01'),
		user: {
			id: '1',
			username: 'roman',
			displayName: 'Roman',
			imageUrl: '',
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
				id: '2',
				displayName: 'andrew',
			},
		},
		story: {
			id: '4991',
			preview: {
				image: '',
			},
		},
		user: {
			id: '3',
			username: 'lisa',
			displayName: 'Lisa',
			imageUrl: '',
		},
	},
	{
		id: '12hy7',
		type: 'follow',
		date: new Date('2023-11-11'),
		user: {
			id: '4',
			username: 'oleg',
			displayName: 'oleg',
			imageUrl: '',
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
				id: '2',
				displayName: 'andrew',
			},
		},
		story: {
			id: '4991',
			preview: {
				image: '',
			},
			author: {
				id: '2',
				username: 'andrew',
			},
		},
		user: {
			id: '754',
			username: 'lisa',
			displayName: 'Lisa',
			imageUrl: '',
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
			id: '5555',
			username: 'artem',
			displayName: 'artem',
			imageUrl: '',
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
				id: '2',
				displayName: 'andrew',
			},
		},
		story: {
			id: '49ssd91',
			preview: {
				image: '',
			},
		},
		user: {
			id: '12331',
			username: 'nina',
			displayName: 'Nina',
			imageUrl: '',
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
				id: '2',
				username: 'andrew',
			},
		},
		user: {
			id: '5151',
			username: 'artem',
			displayName: 'artem',
			imageUrl: '',
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
				id: '2',
				displayName: 'andrew',
			},
		},
		story: {
			id: '49ssd91',
			preview: {
				image: '',
			},
			author: {
				id: '2',
				username: 'andrew',
			},
		},
		user: {
			id: '515',
			username: 'nina',
			displayName: 'Nina',
			imageUrl: '',
		},
	},
	{
		id: '123vt',
		type: 'follow',
		date: new Date('2024-01-21'),
		user: {
			id: '56',
			username: 'lisa',
			displayName: 'Lisa',
			imageUrl: '',
			isFollowedByYou: true,
		},
	},
	{
		id: '1237eqe14',
		type: 'follow',
		date: new Date('2022-02-11'),
		user: {
			id: '44',
			username: 'ivan',
			displayName: 'Ivan',
			imageUrl: '',
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
				id: '2',
				username: 'andrew',
			},
		},
		count: 193,
		users: [
			{
				id: '1234',
				username: 'lisa',
				displayName: 'Lisa',
				imageUrl: '',
			},
			{
				id: '123',
				username: 'lisa4ka123123',
				displayName: 'Lisa4ka123123',
				imageUrl: '',
			},
		],
	},
];

const AllNotificationsList = () => {
	return (
		<NotificationsList
			notifications={testAll}
			noNotificationsTitle="All activity"
			noNotificationsIcon={messageIcon}
			noNotificationsDescr="Notifications about your account will appear here"
		/>
	);
};

export default AllNotificationsList;
