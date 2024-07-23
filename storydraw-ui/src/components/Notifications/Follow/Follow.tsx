import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Follow.module.scss';
import defaultImg from '@/assets/images/default.svg?url';
import FriendshipBtn from './FriendshipBtn/FriendshipBtn';
import { closeNotificationsModal } from '@/features/notifications/notificationsSlice';
import type { FollowNotification } from '@/types/Notification';
import { displayDate } from '@/utils/dateUtils';

const Follow = (props: FollowNotification) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		date,
		user: { username, displayName, imageUrl, isFollowedByYou },
	} = props;

	const handleClick = () => {
		dispatch(closeNotificationsModal());
		navigate(`/@${username}`);
	};

	return (
		<li className={styles.Follow}>
			<div className={styles.UserLink} onClick={handleClick}>
				<div className={styles.UserImgWr}>
					<img src={imageUrl || defaultImg} alt="Profile picture" className={styles.UserImg} />
				</div>
				<div className={styles.UserInfo}>
					<span className={styles.DisplayName}>{displayName}</span>
					<span className={styles.FollowDate}>Follows you. {displayDate(date)}</span>
				</div>
			</div>
			<FriendshipBtn isFollowedByYou={isFollowedByYou} />
		</li>
	);
};

export default Follow;
