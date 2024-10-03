import styles from './NotificationPlaceholder.module.scss';

const NotificationPlaceholder = () => {
	return (
		<div className={styles.NotificationPlaceholder}>
			<div className={styles.UserImg} />
			<div className={styles.UserInfo}>
				<div className={styles.DisplayName}></div>
				<div className={styles.FollowDate}></div>
			</div>
		</div>
	);
};

export default NotificationPlaceholder;
