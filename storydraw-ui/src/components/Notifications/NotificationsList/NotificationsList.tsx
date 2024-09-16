import React from 'react';
import { useSelector } from 'react-redux';
import styles from './NotificationsList.module.scss';
import Follow from '@/components/Notifications/Follow/Follow';
import Like from '@/components/Notifications/Like/Like';
import Comment from '@/components/Notifications/Comment/Comment';
import NoNotifications from './NoNotifications/NoNotifications';
import type { Notification } from '@/types/Notification';
import { categorizeNotificationsByDate } from '@/utils/notificationsUtils';
import { NOTIFICATIONS_TYPE } from '@/constants/notification';
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
							case NOTIFICATIONS_TYPE.FOLLOW:
								return <Follow key={notification.id} notification={notification} />;

							case NOTIFICATIONS_TYPE.LIKE:
								return <Like key={notification.id} notification={notification} currentUser={currentUser} />;

							case NOTIFICATIONS_TYPE.COMMENT:
								return <Comment key={notification.id} notification={notification} currentUser={currentUser} />;

							case NOTIFICATIONS_TYPE.MENTION:
								return <Mention key={notification.id} notification={notification} />;

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
