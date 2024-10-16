import { useSelector } from 'react-redux';
import styles from './NotificationsList.module.scss';
import Follow from '@/components/Notifications/Follow/Follow';
import Like from '@/components/Notifications/Like/Like';
import Comment from '@/components/Notifications/Comment/Comment';
import NoNotifications from './NoNotifications/NoNotifications';
import type { CommentNotification, FollowNotification, LikeNotification, MentionNotification, Notification } from '@/types/Notification';
import { categorizeNotificationsByDate } from '@/utils/notificationsUtils';
import { NotificationType } from '@/__generated__/graphql';
import { selectUser } from '@/features/user/userSlice';
import Mention from '../Mention/Mention';

type NotificationsListProps = {
	notifications: Notification[];
	noNotificationsTitle: string;
	noNotificationsIcon: string;
	noNotificationsDescr: string;
};

const NotificationsList = (props: NotificationsListProps) => {
	const { notifications, noNotificationsTitle, noNotificationsIcon, noNotificationsDescr } = props;
	const { thisWeek, thisMonth, previous } = categorizeNotificationsByDate(notifications);
	const currentUser = useSelector(selectUser);

	const renderNotifications = (notifications: Notification[], title: string) => {
		return (
			<>
				<div className={styles.DateText}>{title}</div>
				<ul>
					{notifications.map((notification: Notification) => {
						switch (notification.type) {
							case NotificationType.Follow:
								return <Follow key={notification.id} notification={notification as FollowNotification} />;

							case NotificationType.Like:
								return (
									<Like key={notification.id} notification={notification as LikeNotification} currentUser={currentUser} />
								);

							case NotificationType.Comment:
								return (
									<Comment
										key={notification.id}
										notification={notification as CommentNotification}
										currentUser={currentUser}
									/>
								);

							case NotificationType.Mention:
								return <Mention key={notification.id} notification={notification as MentionNotification} />;

							default:
								return null;
						}
					})}
				</ul>
			</>
		);
	};

	return (
		<>
			{thisWeek.length + thisMonth.length + previous.length > 0 ? (
				<>
					{thisWeek.length > 0 && renderNotifications(thisWeek, 'This week')}
					{thisMonth.length > 0 && renderNotifications(thisMonth, 'This Month')}
					{previous.length > 0 && renderNotifications(previous, 'Previous')}
				</>
			) : (
				<NoNotifications title={noNotificationsTitle} icon={noNotificationsIcon}>
					{noNotificationsDescr}
				</NoNotifications>
			)}
		</>
	);
};

export default NotificationsList;
