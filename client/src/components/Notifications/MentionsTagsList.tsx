import React from 'react';
import tagIcon from '@/assets/icons/notifications/tag.svg?url';
import NotificationsList from './NotificationsList/NotificationsList';

const MentionsTagsList = () => {
	return (
		<NotificationsList
			notifications={[]}
			noNotificationsTitle="Mentions of You"
			noNotificationsIcon={tagIcon}
			noNotificationsDescr="When someone mentions you, you'll see it here"
		/>
	);
};

export default MentionsTagsList;
