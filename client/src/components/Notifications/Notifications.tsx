import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Notifications.module.css';
import HTag from '../ui/HTag/HTag';
import Button from '../ui/buttons/Button/Button';
import AllNotificationsList from './AllNotificationsList';
import LikesList from './LikesList';
import CommentsList from './CommentsList';
import MentionsTagsList from './MentionsTagsList';
import FollowersList from './FollowersList';
import { changeNotificationsCategory } from '@/features/notifications/notificationsSlice';
import { selectNotificationsCategory } from '@/features/notifications/notificationsSlice';

type NotificationsCategory = 'all' | 'likes' | 'comments' | 'mentionsTags' | 'followers';

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

const Notifications = () => {
	const dispatch = useDispatch();
	const notificationsCategory = useSelector(selectNotificationsCategory);

	const hndleCategoryChange = (category: NotificationsCategory) => {
		dispatch(changeNotificationsCategory(category));
	};

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
								category.type === notificationsCategory && styles.Active,
							].join(' ')}
							onClick={hndleCategoryChange.bind(this, category.type)}
						>
							{category.title}
						</Button>
					))}
				</div>
			</div>

			{notificationsCategory === 'all' && <AllNotificationsList />}
			{notificationsCategory === 'likes' && <LikesList />}
			{notificationsCategory === 'comments' && <CommentsList />}
			{notificationsCategory === 'mentionsTags' && <MentionsTagsList />}
			{notificationsCategory === 'followers' && <FollowersList />}
		</div>
	);
};

export default Notifications;
