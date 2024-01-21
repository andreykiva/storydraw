import React from 'react';
import notifSharedStyles from './notifSharedStyles.module.css';
import heartImg from '@/assets/icons/notifications/heart.svg';
import Like from './Like/Like';

const testLikes = [
	{
		id: '123',
		type: 'comment',
		text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur aperiam magni incidunt',
		date: '12-02',
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
		date: '13-06',
		parentComment: null,
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
		date: '01-12',
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

const LikesList = () => {
	return (
		<div className={notifSharedStyles.NotificationsListWr}>
			{testLikes ? (
				<>
					<span className={notifSharedStyles.DateText}>Previous</span>
					<ul className={notifSharedStyles.NotificationsList}>
						{testLikes.map((like) => (
							<Like key={like.id} {...like} />
						))}
					</ul>
				</>
			) : (
				<div className={notifSharedStyles.NoNotifications}>
					<img src={heartImg} alt="Heart" className={notifSharedStyles.NoNotificationsImg} />
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
