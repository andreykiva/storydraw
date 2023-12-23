import React from 'react';
import styles from './Notifications.module.css';
import HTag from '../ui/HTag/HTag';

const Notifications = () => {
	
	return (
		<div className={styles.Notifications}>
			<div className={styles.NotificationsTriangle}></div>
			<HTag tag='h4' className={styles.Title}>Notifications</HTag>
		</div>
	);
};

export default Notifications;
