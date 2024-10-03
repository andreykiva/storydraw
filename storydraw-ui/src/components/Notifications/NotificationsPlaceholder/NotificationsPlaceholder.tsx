import styles from './NotificationsPlaceholder.module.scss';
import NotificationPlaceholder from './NotificationPlaceholder/NotificationPlaceholder';

type NotificationsPlaceholderProps = {
	length: number;
};
const NotificationsPlaceholder = ({ length }: NotificationsPlaceholderProps) => {
	return (
		<div className={styles.NotificationsPlaceholder}>
			{Array.from({ length: length > 0 ? length : 8 }).map((_, index) => (
				<NotificationPlaceholder key={index} />
			))}
		</div>
	);
};

export default NotificationsPlaceholder;
