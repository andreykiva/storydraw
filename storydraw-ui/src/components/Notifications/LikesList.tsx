import { useQuery } from '@apollo/client';
import heartIcon from '@/assets/icons/notifications/heart.svg';
import NotificationsList from './NotificationsList/NotificationsList';
import { GET_LIKES_NOTIFICATIONS } from '@/graphql/notifications/queries';
import Loader from '../ui/Loader/Loader';

const LikesList = () => {
	const { loading, error, data } = useQuery(GET_LIKES_NOTIFICATIONS, {
		fetchPolicy: 'no-cache',
	});

	if (loading && !data) return <Loader />;
	if (error) return <div>Error...</div>;

	return (
		<NotificationsList
			notifications={data.likesNotifications}
			noNotificationsTitle="Likes on your stories"
			noNotificationsIcon={heartIcon}
			noNotificationsDescr="When someone likes one of your stories, you`ll see it here"
		/>
	);
};

export default LikesList;
