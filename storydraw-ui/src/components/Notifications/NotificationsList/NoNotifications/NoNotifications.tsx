import styles from './NoNotifications.module.scss';

type NoNotificationsProps = {
	title: string;
	icon: string;
	children: string;
};

const NoNotifications = ({ title, icon, children }: NoNotificationsProps) => {
	return (
		<div className={styles.NoNotifications}>
			<img src={icon} alt="Message" className={styles.NoNotificationsIcon} />
			<span className={styles.NoNotificationsTitle}>{title}</span>
			<p className={styles.NoNotificationsDescr}>{children}</p>
		</div>
	);
};

export default NoNotifications;
