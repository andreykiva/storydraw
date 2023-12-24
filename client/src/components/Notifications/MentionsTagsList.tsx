import React from 'react';
import notifSharedStyles from './notifSharedStyles.module.css';
import tagImg from '@/assets/icons/notifications/tag.svg';

const MentionsTagsList = () => {
	return (
		<div className={notifSharedStyles.NotificationsList}>
			<div className={notifSharedStyles.NoNotifications}>
				<img src={tagImg} alt="Tag" className={notifSharedStyles.NoNotificationsImg} />
				<span className={notifSharedStyles.NoNotificationsTitle}>Mentions of You</span>
				<p className={notifSharedStyles.NoNotificationsDescr}>When someone mentions you, you'll see it here</p>
			</div>
		</div>
	);
};

export default MentionsTagsList;
