import React from 'react';
import notifSharedStyles from './notifSharedStyles.module.css';
import personImg from '@/assets/icons/notifications/person.svg';

const FollowersList = () => {
	return (
		<div className={notifSharedStyles.NotificationsList}>
			<div className={notifSharedStyles.NoNotifications}>
				<img src={personImg} alt="Person" className={notifSharedStyles.NoNotificationsImg} />
				<span className={notifSharedStyles.NoNotificationsTitle}>New followers</span>
				<p className={notifSharedStyles.NoNotificationsDescr}>
					When someone new follows you, you'll see it here
				</p>
			</div>
		</div>
	);
};

export default FollowersList;
