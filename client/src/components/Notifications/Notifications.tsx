import React, { useState } from 'react';
import styles from './Notifications.module.css';
import HTag from '../ui/HTag/HTag';
import Button from '../ui/buttons/Button/Button';
import AllNotificationsList from './AllNotificationsList';
import LikesList from './LikesList';
import CommentsList from './CommentsList';
import MentionsTagsList from './MentionsTagsList';
import FollowersList from './FollowersList';

type NotificationCategory = 'all' | 'likes' | 'comments' | 'mentionsTags' | 'followers';

const categories = [
	{
		title: 'All activity',
		type: 'all',
	},
	{
		title: 'Likes',
		type: 'likes',
	},
	{
		title: 'Comments',
		type: 'comments',
	},
	{
		title: 'Mentions and tags',
		type: 'mentionsTags',
	},
	{
		title: 'Followers',
		type: 'followers',
	},
];

const Notifications = ({ closeNotifTest }: { closeNotifTest: () => void }) => {
	const [notificationCategory, setNotificationCategory] = useState<NotificationCategory>('followers');

	return (
		<div className={styles.Notifications}>
			<div className={styles.NotifTriangle}></div>
			<div className={styles.NotifHeader}>
				<HTag tag="h4" className={styles.NotifTitle}>
					Notifications
				</HTag>
				<div className={styles.NotifCategories}>
					{categories.map((category) => (
						<Button
							key={category.type}
							className={[
								styles.NotifCategory,
								category.type === notificationCategory && styles.Active,
							].join(' ')}
							onClick={setNotificationCategory.bind(this, category.type)}
						>
							{category.title}
						</Button>
					))}
				</div>
			</div>

			{notificationCategory === 'all' && <AllNotificationsList />}
			{notificationCategory === 'likes' && <LikesList />}
			{notificationCategory === 'comments' && <CommentsList />}
			{notificationCategory === 'mentionsTags' && <MentionsTagsList />}
			{notificationCategory === 'followers' && <FollowersList closeNotifTest={closeNotifTest} />}
		</div>
	);
};

export default Notifications;
