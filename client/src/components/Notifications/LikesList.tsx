import React from 'react';
import notifSharedStyles from './notifSharedStyles.module.css';
import heartImg from '@/assets/icons/notifications/heart.svg';

const LikesList = () => {
	return (
		<div className={notifSharedStyles.NotificationsListWr}>
			<div className={notifSharedStyles.NoNotifications}>
				<img src={heartImg} alt="Heart" className={notifSharedStyles.NoNotificationsImg} />
				<span className={notifSharedStyles.NoNotificationsTitle}>Likes on your videos</span>
				<p className={notifSharedStyles.NoNotificationsDescr}>
					When someone likes one of your videos, you'll see it here
				</p>
			</div>
		</div>
	);
};

export default LikesList;
