import { useState } from 'react';
import { useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';
import notificationsStyles from './Notifications.module.scss';
import tagIcon from '@/assets/icons/notifications/tag.svg';
import NotificationsList from './NotificationsList/NotificationsList';
import { GET_MENTIONS_NOTIFICATIONS } from '@/graphql/notifications/queries';
import NotificationsPlaceholder from './NotificationsPlaceholder/NotificationsPlaceholder';
import Loader from '@/components/ui/Loader/Loader';
import { MENTIONS_NOTIFICATIONS_LIMIT } from '@/constants/pagination';
import { MentionNotification } from '@/types/Notification';

const MentionsList = () => {
	const [notifications, setNotifications] = useState<MentionNotification[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [cursor, setCursor] = useState(null);

	const { error } = useQuery(GET_MENTIONS_NOTIFICATIONS, {
		variables: {
			paginationInput: {
				limit: MENTIONS_NOTIFICATIONS_LIMIT,
				cursor,
			},
		},
		onCompleted(data) {
			const newNotifications = data.getMentionsNotifications;

			setNotifications((prevNotifications) => [...prevNotifications, ...newNotifications]);
			setIsLoaded(true);

			if (newNotifications.length < MENTIONS_NOTIFICATIONS_LIMIT) {
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
				noNotificationsTitle="Mentions of You"
				noNotificationsIcon={tagIcon}
				noNotificationsDescr="When someone mentions you, you'll see it here"
			/>
		</InfiniteScroll>
	);
};

export default MentionsList;
