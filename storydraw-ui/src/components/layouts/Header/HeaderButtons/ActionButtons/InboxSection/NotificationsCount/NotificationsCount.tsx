import React from 'react';
import styles from './NotificationsCount.module.scss';

type NotificationsCountProps = {
	count: number;
};

const NotificationsCount = ({ count }: NotificationsCountProps) => {
	if (!count || count <= 0) return null;

	return <div className={styles.NotificationsCount}>{count > 9 ? '9+' : count}</div>;
};

export default NotificationsCount;
