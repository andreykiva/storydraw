import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Like.module.scss';
import defaultImg from '@/assets/images/default.svg';
import { closeNotificationsModal } from '@/features/notifications/notificationsSlice';
import type { LikeNotification } from '@/types/Notification';
import { displayDate } from '@/utils/dateUtils';
import { UserState } from '@/features/user/userSlice';
import storyImg from '@/assets/images/preview.jpg';

type LikeProps = {
	notification: LikeNotification;
	currentUser: UserState;
};

const Like = ({ notification, currentUser }: LikeProps) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userNameRef = useRef<HTMLAnchorElement>(null);
	const userImgRef = useRef<HTMLImageElement>(null);
	const { createdAt, like, initiator, story } = notification;

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!userNameRef.current.contains(e.target as Node) && !userImgRef.current.contains(e.target as Node)) {
			navigate(`/@${story.user.username}/story/${story.id}`);
		}
		dispatch(closeNotificationsModal());
	};

	return (
		<li className={styles.Like}>
			<div className={styles.StoryLink} onClick={handleClick}>
				<Link to={`/@${initiator.username}`} className={styles.UserImgWr}>
					<img src={initiator.imageUrl || defaultImg} alt="Profile picture" className={styles.UserImg} ref={userImgRef} />
				</Link>
				<div className={styles.LikeInfo}>
					<Link to={`/@${initiator.username}`} className={styles.DisplayName} ref={userNameRef}>
						{initiator.displayName}
					</Link>
					<p className={styles.LikeNote}>
						{like.comment ? 'liked your comment.' : 'liked your story.'}
						<span className={styles.LikeDate}>{displayDate(createdAt)}</span>
					</p>
					{like.comment && (
						<div className={styles.ParentComment}>
							{currentUser.displayName}: {like.comment.content}
						</div>
					)}
				</div>
				<div className={styles.Story}>
					<img src={storyImg} alt="Story preview" className={styles.StoryImg} />
				</div>
			</div>
		</li>
	);
};

export default Like;
