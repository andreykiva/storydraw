import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Follow.module.css';
import defaultImg from '@/assets/icons/default.svg';
import FriendshipBtn from './FriendshipBtn/FriendshipBtn';
import { closeNotificationsModal } from '@/features/notifications/notificationsSlice';
import type { FollowNotification } from '@/types/Notification';
import { displayDate } from '@/utils/dateUtils';

const Follow = (props: FollowNotification) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		date,
		user: { username, title, image, isFollowingYou, isFollowedByYou },
	} = props;

	const handleFollowClick = () => {
		dispatch(closeNotificationsModal());
		navigate(`/@${username}`);
	};

	return (
		<li className={styles.Follow}>
			<div className={styles.UserLink} onClick={handleFollowClick}>
				<div className={styles.UserImgWr}>
					<img src={image || defaultImg} alt="Profile picture" className={styles.UserImg} />
				</div>
				<div className={styles.UserInfo}>
					<span className={styles.UserTitle}>{title}</span>
					<span className={styles.FollowDate}>Follows you. {displayDate(date)}</span>
				</div>
			</div>
			<FriendshipBtn isFollowingYou={isFollowingYou} isFollowedByYou={isFollowedByYou} />
		</li>
	);
};

export default Follow;
