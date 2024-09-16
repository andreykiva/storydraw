import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import styles from './Notifications.module.scss';
import HTag from '@/components/ui/HTag/HTag';
import Button from '@/components/ui/buttons/Button/Button';
import AllNotificationsList from './AllNotificationsList';
import LikesList from './LikesList';
import CommentsList from './CommentsList';
import MentionsList from './MentionsList';
import FollowsList from './FollowsList';
import { changeNotificationsCategory, selectNotificationsCategory } from '@/features/notifications/notificationsSlice';
import WrapperWithTriangle from '@/components/ui/WrapperWithTriangle/WrapperWithTriangle';
import { NOTIFICATIONS_CATEGORY } from '@/constants/notification';
import { MENU_POSITION } from '@/constants/ui';

const categories = [
	{
		title: 'All activity',
		type: NOTIFICATIONS_CATEGORY.ALL,
	},
	{
		title: 'Likes',
		type: NOTIFICATIONS_CATEGORY.LIKES,
	},
	{
		title: 'Comments',
		type: NOTIFICATIONS_CATEGORY.COMMENTS,
	},
	{
		title: 'Mentions',
		type: NOTIFICATIONS_CATEGORY.MENTIONS,
	},
	{
		title: 'Followers',
		type: NOTIFICATIONS_CATEGORY.FOLLOWERS,
	},
];

const Notifications = () => {
	const dispatch = useDispatch();
	const notificationsCategory = useSelector(selectNotificationsCategory);

	const handleCategoryChange = (category: NOTIFICATIONS_CATEGORY) => {
		dispatch(changeNotificationsCategory(category));
	};

	return (
		<WrapperWithTriangle position={MENU_POSITION.BOTTOM_LEFT} className={styles.Notifications}>
			<div className={styles.NotifHeader}>
				<HTag tag="h4" className={styles.NotifTitle}>
					Notifications
				</HTag>
				<div className={styles.NotifCategories}>
					{categories.map((category) => (
						<Button
							key={category.type}
							className={cn(styles.NotifCategory, category.type === notificationsCategory && styles.Active)}
							onClick={() => handleCategoryChange(category.type)}
						>
							{category.title}
						</Button>
					))}
				</div>
			</div>
			<div className={styles.NotificationsListWr}>
				{notificationsCategory === NOTIFICATIONS_CATEGORY.ALL && <AllNotificationsList />}
				{notificationsCategory === NOTIFICATIONS_CATEGORY.LIKES && <LikesList />}
				{notificationsCategory === NOTIFICATIONS_CATEGORY.COMMENTS && <CommentsList />}
				{notificationsCategory === NOTIFICATIONS_CATEGORY.MENTIONS && <MentionsList />}
				{notificationsCategory === NOTIFICATIONS_CATEGORY.FOLLOWERS && <FollowsList />}
			</div>
		</WrapperWithTriangle>
	);
};

export default Notifications;
