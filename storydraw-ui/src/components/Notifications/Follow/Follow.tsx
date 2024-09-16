import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Follow.module.scss';
import defaultImg from '@/assets/images/default.svg';
import { closeNotificationsModal } from '@/features/notifications/notificationsSlice';
import type { FollowNotification } from '@/types/Notification';
import { displayDate } from '@/utils/dateUtils';
import FollowButton from '@/components/ui/buttons/FollowButton/FollowButton';
import useFollow from '@/hooks/interaction/useFollow';

type FollowProps = {
	notification: FollowNotification;
};

const Follow = ({ notification }: FollowProps) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { createdAt, initiator } = notification;

	const { handleFollow, loading, isFollowing } = useFollow({
		isAuth: true,
		userId: notification.initiator.id,
		initIsFollowing: notification.initiator.isFollowing,
	});

	const handleClick = () => {
		dispatch(closeNotificationsModal());
		navigate(`/@${initiator.username}`);
	};

	return (
		<li className={styles.Follow}>
			<div className={styles.UserLink} onClick={handleClick}>
				<div className={styles.UserImgWr}>
					<img src={initiator.imageUrl || defaultImg} alt="Profile picture" className={styles.UserImg} />
				</div>
				<div className={styles.UserInfo}>
					<span className={styles.DisplayName}>{initiator.displayName}</span>
					<span className={styles.FollowDate}>Follows you. {displayDate(createdAt)}</span>
				</div>
			</div>
			<FollowButton
				className={styles.FollowButton}
				isFollowing={isFollowing}
				loading={loading}
				onFollow={handleFollow}
				isFollowedBy={true}
			/>
		</li>
	);
};

export default Follow;
