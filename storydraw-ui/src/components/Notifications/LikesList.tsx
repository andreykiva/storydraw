import { useState } from 'react';
import { useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';
import notificationsStyles from './Notifications.module.scss';
import heartIcon from '@/assets/icons/notifications/heart.svg';
import NotificationsList from './NotificationsList/NotificationsList';
import { GET_LIKES_NOTIFICATIONS } from '@/graphql/notifications/queries';
import NotificationsPlaceholder from './NotificationsPlaceholder/NotificationsPlaceholder';
import type { LikeNotification } from '@/types/Notification';
import Loader from '@/components/ui/Loader/Loader';
import { LIKES_NOTIFICATIONS_LIMIT } from '@/constants/pagination';

const LikesList = () => {
	const [notifications, setNotifications] = useState<LikeNotification[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [cursor, setCursor] = useState(null);

	const { error } = useQuery(GET_LIKES_NOTIFICATIONS, {
		variables: {
			paginationInput: {
				limit: LIKES_NOTIFICATIONS_LIMIT,
				cursor,
			},
		},
		onCompleted(data) {
			const newNotifications = data.getLikesNotifications;

			setNotifications((prevNotifications) => [...prevNotifications, ...newNotifications]);
			setIsLoaded(true);

			if (newNotifications.length < LIKES_NOTIFICATIONS_LIMIT) {
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
				noNotificationsTitle="Likes on your stories"
				noNotificationsIcon={heartIcon}
				noNotificationsDescr="When someone likes one of your stories, you`ll see it here"
			/>
		</InfiniteScroll>
	);
};

export default LikesList;
