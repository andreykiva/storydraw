import React from 'react';
import { useQuery } from '@apollo/client';
import tagIcon from '@/assets/icons/notifications/tag.svg';
import NotificationsList from './NotificationsList/NotificationsList';
import Loader from '../ui/Loader/Loader';
import { GET_MENTIONS_NOTIFICATIONS } from '@/graphql/notifications/queries';

const MentionsList = () => {
	const { loading, error, data } = useQuery(GET_MENTIONS_NOTIFICATIONS, {
		fetchPolicy: 'no-cache',
	});

	if (loading && !data) return <Loader />;
	if (error) return <div>Error...</div>;

	return (
		<NotificationsList
			notifications={data.mentionsNotifications}
			noNotificationsTitle="Mentions of You"
			noNotificationsIcon={tagIcon}
			noNotificationsDescr="When someone mentions you, you'll see it here"
		/>
	);
};

export default MentionsList;
