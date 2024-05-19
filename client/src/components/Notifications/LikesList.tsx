import React from 'react';
import heartIcon from '@/assets/icons/notifications/heart.svg?url';
import type { LikeNotification } from '@/types/Notification';
import NotificationsList from './NotificationsList/NotificationsList';

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
	return (
		<NotificationsList
			notifications={testLikes}
			noNotificationsTitle="Likes on your stories"
			noNotificationsIcon={heartIcon}
			noNotificationsDescr="When someone likes one of your videos, you`ll see it here"
		/>
	);
};

export default LikesList;
