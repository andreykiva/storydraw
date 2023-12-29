import React from 'react';
import notifSharedStyles from './notifSharedStyles.module.css';
import personImg from '@/assets/icons/notifications/person.svg';
import Follow from './Follow/Follow';

const testFollows = [
	{
		id: '123',
		date: '12-02',
		user: {
			id: '123',
			username: 'lisa',
			title: 'Lisa',
			image: '',
			isFollowingYou: false,
			isFollowedByYou: true,
		},
	},
	{
		id: '1233',
		date: '10-01',
		user: {
			id: '1231',
			username: 'roman',
			title: 'Roman',
			image: '',
			isFollowingYou: true,
			isFollowedByYou: true,
		},
	},
	{
		id: '1237',
		date: '06-12',
		user: {
			id: '1423',
			username: 'oleg',
			title: 'oleg',
			image: '',
			isFollowingYou: true,
			isFollowedByYou: false,
		},
	},
	{
		id: '123714',
		date: '03-12',
		user: {
			id: '1421243',
			username: 'ivan',
			title: 'Ivan',
			image: '',
			isFollowingYou: false,
			isFollowedByYou: false,
		},
	},
];

const FollowersList = () => {
	return (
		<div className={notifSharedStyles.NotificationsListWr}>
			{testFollows ? (
				<div className={notifSharedStyles.NotificationsList}>
					<span className={notifSharedStyles.DateText}>Previous</span>
					{testFollows.map((follow) => (
						<Follow key={follow.id} {...follow} />
					))}
				</div>
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

export default FollowersList;
