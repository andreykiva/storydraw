import React from 'react';
import notifSharedStyles from './notifSharedStyles.module.css';
import commentImg from '@/assets/icons/notifications/comment.svg';

const CommentsList = () => {
	return (
		<div className={notifSharedStyles.NotificationsList}>
			<div className={notifSharedStyles.NoNotifications}>
				<img src={commentImg} alt="Comment" className={notifSharedStyles.NoNotificationsImg} />
				<span className={notifSharedStyles.NoNotificationsTitle}>Comments on your videos</span>
				<p className={notifSharedStyles.NoNotificationsDescr}>
					When someone comments on one of your videos, you'll see it here
				</p>
			</div>
		</div>
	);
};

export default CommentsList;
