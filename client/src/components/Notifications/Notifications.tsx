import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Notifications.module.css';
import HTag from '@/components/ui/HTag/HTag';
import Button from '@/components/ui/buttons/Button/Button';
import AllNotificationsList from './AllNotificationsList';
import LikesList from './LikesList';
import CommentsList from './CommentsList';
import MentionsTagsList from './MentionsTagsList';
import FollowsList from './FollowsList';
import { changeNotificationsCategory, selectNotificationsCategory } from '@/features/notifications/notificationsSlice';
import WrapperWithTriangle from '@/components/ui/WrapperWithTriangle/WrapperWithTriangle';

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
		<WrapperWithTriangle position="bottomLeft" className={styles.Notifications}>
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
			{notificationsCategory === 'followers' && <FollowsList />}
		</WrapperWithTriangle>
	);
};

export default Notifications;
