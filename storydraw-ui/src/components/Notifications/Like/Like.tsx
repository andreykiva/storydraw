import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Like.module.scss';
import defaultImg from '@/assets/images/default.svg?url';
import { closeNotificationsModal } from '@/features/notifications/notificationsSlice';
import type { LikeNotification } from '@/types/Notification';
import { displayDate } from '@/utils/dateUtils';

const Like = (props: LikeNotification) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userNameRef = useRef<HTMLAnchorElement>(null);
	const userImgRef = useRef<HTMLImageElement>(null);
	const otherUsersOneRef = useRef<HTMLAnchorElement>(null);
	const otherUsersTwoRef = useRef<HTMLAnchorElement>(null);
	const { date, parentComment, user, users, amount, story } = props;

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const isSingleUserClick =
			!amount &&
			!userNameRef.current.contains(e.target as Node) &&
			!userImgRef.current.contains(e.target as Node);

		const isMultiUserClick =
			amount &&
			!otherUsersOneRef.current.contains(e.target as Node) &&
			!otherUsersTwoRef.current.contains(e.target as Node);

		if (isSingleUserClick || isMultiUserClick) {
			navigate(`/@${story.author.username}/story/${story.id}`);
		}

		dispatch(closeNotificationsModal());
	};

	return (
		<li className={styles.Like}>
			<div className={styles.StoryLink} onClick={handleClick}>
				{amount ? (
					<div className={styles.UserImgSmallWr}>
						<img src={users[0].image || defaultImg} alt="Profile picture" className={styles.UserImgSmall} />
						<img src={users[1].image || defaultImg} alt="Profile picture" className={styles.UserImgSmall} />
					</div>
				) : (
					<Link to={`/@${user.username}`} className={styles.UserImgWr}>
						<img
							src={user.image || defaultImg}
							alt="Profile picture"
							className={styles.UserImg}
							ref={userImgRef}
						/>
					</Link>
				)}
				<div className={styles.LikeInfo}>
					{amount ? (
						<p className={styles.UsersAmount}>
							<Link to={`/@${users[0].username}`} className={styles.Name} ref={otherUsersOneRef}>
								{users[0].name}
							</Link>
							<span>, </span>
							<Link to={`/@${users[1].username}`} className={styles.Name} ref={otherUsersTwoRef}>
								{users[1].name}
							</Link>
							{amount - 2 > 1 && <span className={styles.Others}> and {amount - 2} others</span>}
						</p>
					) : (
						<Link to={`/@${user.username}`} className={styles.Name} ref={userNameRef}>
							{user.name}
						</Link>
					)}
					<p className={styles.LikeNote}>
						{parentComment ? 'liked your comment.' : 'liked your story.'}
						<span className={styles.LikeDate}>{displayDate(date)}</span>
					</p>
					{parentComment && (
						<div className={styles.ParentComment}>
							{parentComment.user.name}: {parentComment.text}
						</div>
					)}
				</div>
				<div className={styles.Story}></div>
			</div>
		</li>
	);
};

export default Like;
