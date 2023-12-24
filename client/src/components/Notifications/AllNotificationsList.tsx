import React from 'react';
import notifSharedStyles from './notifSharedStyles.module.css';
import messageImg from '@/assets/icons/notifications/message.svg';

const AllNotificationsList = () => {
	return (
		<div className={notifSharedStyles.NotificationsList}>
			<div className={notifSharedStyles.NoNotifications}>
				<img src={messageImg} alt="Message" className={notifSharedStyles.NoNotificationsImg} />
				<span className={notifSharedStyles.NoNotificationsTitle}>All activity</span>
				<p className={notifSharedStyles.NoNotificationsDescr}>
					Notifications about your account will appear here
				</p>
			</div>
		</div>
	);
};

export default AllNotificationsList;
