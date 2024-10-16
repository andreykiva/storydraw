import { useState } from 'react';
import { useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';
import notificationsStyles from './Notifications.module.scss';
import personIcon from '@/assets/icons/notifications/person.svg';
import NotificationsList from './NotificationsList/NotificationsList';
import { GET_FOLLOWS_NOTIFICATIONS } from '@/graphql/notifications/queries';
import NotificationsPlaceholder from './NotificationsPlaceholder/NotificationsPlaceholder';
import type { FollowNotification } from '@/types/Notification';
import Loader from '@/components/ui/Loader/Loader';
import { FOLLOWS_NOTIFICATIONS_LIMIT } from '@/constants/pagination';

const FollowsList = () => {
	const [notifications, setNotifications] = useState<FollowNotification[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [cursor, setCursor] = useState(null);

	const { error } = useQuery(GET_FOLLOWS_NOTIFICATIONS, {
		variables: {
			paginationInput: {
				limit: FOLLOWS_NOTIFICATIONS_LIMIT,
				cursor,
			},
		},
		onCompleted(data) {
			const newNotifications = data.getFollowsNotifications;

			setNotifications((prevNotifications) => [...prevNotifications, ...newNotifications]);
			setIsLoaded(true);

			if (newNotifications.length < FOLLOWS_NOTIFICATIONS_LIMIT) {
				setHasMore(false);
			}
		},
		onError() {
			setIsLoaded(true);
		},
		notifyOnNetworkStatusChange: true,
		fetchPolicy: 'no-cache',
	});

	const handleChangeCursor = () => {
		const lastNotification = notifications[notifications.length - 1];
		setCursor(lastNotification.createdAt);
	};

	if (!isLoaded) return <NotificationsPlaceholder length={8} />;

	if (error) return <div>Error...</div>;

	return (
		<InfiniteScroll
			dataLength={notifications.length || 0}
			next={handleChangeCursor}
			hasMore={hasMore}
			loader={<Loader className={notificationsStyles.Loader} />}
			scrollableTarget="notificationsContainer"
			style={{ overflow: 'hidden' }}
		>
			<NotificationsList
				notifications={notifications}
				noNotificationsTitle="New followers"
				noNotificationsIcon={personIcon}
				noNotificationsDescr="When someone new follows you, you'll see it here"
			/>
		</InfiniteScroll>
	);
};

export default FollowsList;
