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
			id: '1231',
			username: 'roman',
			name: 'Roman',
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
				name: 'andrew',
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
			name: 'Lisa',
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
			name: 'oleg',
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
				name: 'andrew',
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
			name: 'Lisa',
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
			name: 'artem',
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
				name: 'andrew',
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
			name: 'Nina',
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
			name: 'artem',
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
				name: 'andrew',
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
			name: 'Nina',
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
			name: 'Lisa',
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
			name: 'Ivan',
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
				name: 'Lisa',
				image: '',
			},
			{
				id: '11233cc4123',
				username: 'lisa4ka123123',
				name: 'Lisa4ka123123',
				image: '',
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
