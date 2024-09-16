import React from 'react';
import { useQuery } from '@apollo/client';
import commentIcon from '@/assets/icons/notifications/comment.svg';
import NotificationsList from './NotificationsList/NotificationsList';
import { GET_COMMENTS_NOTIFICATIONS } from '@/graphql/notifications/queries';
import Loader from '../ui/Loader/Loader';

const CommentsList = () => {
	const { loading, error, data } = useQuery(GET_COMMENTS_NOTIFICATIONS, {
		fetchPolicy: 'no-cache',
	});

	if (loading && !data) return <Loader />;
	if (error) return <div>Error...</div>;

	return (
		<NotificationsList
			notifications={data.commentsNotifications}
			noNotificationsTitle="Comments on your stories"
			noNotificationsIcon={commentIcon}
			noNotificationsDescr="When someone comments on one of your stories, you'll see it here"
		/>
	);
};

export default CommentsList;
