import React from 'react';
import notifSharedStyles from './notifSharedStyles.module.css';
import tagIcon from '@/assets/icons/notifications/tag.svg?url';

const MentionsTagsList = () => {
	return (
		<div className={notifSharedStyles.NotificationsListWr}>
			<div className={notifSharedStyles.NoNotifications}>
				<img src={tagIcon} alt="Tag" className={notifSharedStyles.NoNotificationsIcon} />
				<span className={notifSharedStyles.NoNotificationsTitle}>Mentions of You</span>
				<p className={notifSharedStyles.NoNotificationsDescr}>When someone mentions you, you'll see it here</p>
			</div>
		</div>
	);
};

export default MentionsTagsList;
