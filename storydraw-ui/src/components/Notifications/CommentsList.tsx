import { useState } from 'react';
import { useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';
import notificationsStyles from './Notifications.module.scss';
import commentIcon from '@/assets/icons/notifications/comment.svg';
import NotificationsList from './NotificationsList/NotificationsList';
import { GET_COMMENTS_NOTIFICATIONS } from '@/graphql/notifications/queries';
import NotificationsPlaceholder from './NotificationsPlaceholder/NotificationsPlaceholder';
import { COMMENTS_NOTIFICATIONS_LIMIT } from '@/constants/pagination';
import type { Notification } from '@/types/Notification';
import Loader from '@/components/ui/Loader/Loader';

const CommentsList = () => {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [cursor, setCursor] = useState(null);

	const { error } = useQuery(GET_COMMENTS_NOTIFICATIONS, {
		variables: {
			paginationInput: {
				limit: COMMENTS_NOTIFICATIONS_LIMIT,
				cursor,
			},
		},
		onCompleted(data) {
			const newNotifications = data.commentsNotifications;

			setNotifications((prevNotifications) => [...prevNotifications, ...newNotifications]);
			setIsLoaded(true);

			if (newNotifications.length < COMMENTS_NOTIFICATIONS_LIMIT) {
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
				noNotificationsTitle="Comments on your stories"
				noNotificationsIcon={commentIcon}
				noNotificationsDescr="When someone comments on one of your stories, you'll see it here"
			/>
		</InfiniteScroll>
	);
};

export default CommentsList;
