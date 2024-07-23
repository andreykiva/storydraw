import React from 'react';
import commentIcon from '@/assets/icons/notifications/comment.svg?url';
import type { CommentNotification } from '@/types/Notification';
import NotificationsList from './NotificationsList/NotificationsList';

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
				id: '1',
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
			id: '2',
			username: 'lisa',
			displayName: 'Lisa',
			imageUrl: '',
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
			id: '3',
			username: 'artem',
			displayName: 'artem',
			imageUrl: '',
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
				id: '4',
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
			id: '5',
			username: 'nina',
			displayName: 'Nina',
			imageUrl: '',
		},
	},
];

const CommentsList = () => {
	return (
		<NotificationsList
			notifications={testComments}
			noNotificationsTitle="Comments on your videos"
			noNotificationsIcon={commentIcon}
			noNotificationsDescr="When someone comments on one of your videos, you'll see it here"
		/>
	);
};

export default CommentsList;
