import React from 'react';
import { useQuery } from '@apollo/client';
import personIcon from '@/assets/icons/notifications/person.svg';
import NotificationsList from './NotificationsList/NotificationsList';
import { GET_FOLLOWS_NOTIFICATIONS } from '@/graphql/notifications/queries';
import Loader from '../ui/Loader/Loader';

const FollowsList = () => {
	const { loading, error, data } = useQuery(GET_FOLLOWS_NOTIFICATIONS, {
		fetchPolicy: 'no-cache',
	});

	if (loading && !data) return <Loader />;
	if (error) return <div>Error...</div>;

	return (
		<NotificationsList
			notifications={data.followsNotifications}
			noNotificationsTitle="New followers"
			noNotificationsIcon={personIcon}
			noNotificationsDescr="When someone new follows you, you'll see it here"
		/>
	);
};

export default FollowsList;
