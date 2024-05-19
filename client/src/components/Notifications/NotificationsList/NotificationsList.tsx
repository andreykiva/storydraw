import React from 'react';
import styles from './NotificationsList.module.scss';
import Follow from '@/components/Notifications/Follow/Follow';
import Like from '@/components/Notifications/Like/Like';
import Comment from '@/components/Notifications/Comment/Comment';
import NoNotifications from './NoNotifications/NoNotifications';
import type { Notification } from '@/types/Notification';
import { categorizeNotificationsByDate } from '@/utils/notificationsUtils';

type NotificationsListProps = {
	notifications: Notification[];
	noNotificationsTitle: string;
	noNotificationsIcon: string;
	noNotificationsDescr: string;
};

const NotificationsList = (props: NotificationsListProps) => {
	const { notifications, noNotificationsTitle, noNotificationsIcon, noNotificationsDescr } = props;
	const { thisWeek, thisMonth, previous } = categorizeNotificationsByDate(notifications);

	const renderNotifications = (notifications: Notification[], title: string) => {
		return (
			<>
				<div className={styles.DateText}>{title}</div>
				<ul>
					{notifications.map((notification: Notification) => {
						if (notification.type === 'follow') {
							return <Follow key={notification.id} {...notification} />;
						} else if (notification.type === 'like') {
							return <Like key={notification.id} {...notification} />;
						}

						return <Comment key={notification.id} {...notification} />;
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
