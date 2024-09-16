import { useQuery } from '@apollo/client';
import messageIcon from '@/assets/icons/notifications/message.svg';
import NotificationsList from './NotificationsList/NotificationsList';
import { GET_ALL_NOTIFICATIONS } from '@/graphql/notifications/queries';
import Loader from '../ui/Loader/Loader';

const AllNotificationsList = () => {
	const { loading, error, data } = useQuery(GET_ALL_NOTIFICATIONS, {
		fetchPolicy: 'no-cache',
	});

	if (loading && !data) return <Loader />;
	if (error) return <div>Error...</div>;

	return (
		<NotificationsList
			notifications={data.allNotifications}
			noNotificationsTitle="All activity"
			noNotificationsIcon={messageIcon}
			noNotificationsDescr="Notifications about your account will appear here"
		/>
	);
};

export default AllNotificationsList;
