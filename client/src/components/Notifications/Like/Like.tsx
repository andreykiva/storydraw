import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Like.module.css';
import type User from '@/types/User';
import defaultImg from '@/assets/icons/default.svg';
import { closeNotificationsModal } from '@/features/notifications/notificationsSlice';

type ParentComment = {
	id: string;
	user: Pick<User, 'id' | 'title'>;
	text: string;
};

type StoryImages = {
	image: string;
};

type LikedUser = Pick<User, 'id' | 'username' | 'title' | 'image'>;

type LikeProps = {
	id: string;
	date: string;
	parentComment?: ParentComment;
	story: {
		id: string;
		preview: StoryImages;
	};
	user?: LikedUser;
	amount?: number;
	users?: LikedUser[];
};

const Like = (props: LikeProps) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const searchInputRef = useRef(null);
	const { date, parentComment, user, users, amount } = props;

	const handleFollowClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!searchInputRef.current.contains(e.target as Node)) {
			navigate(`/@${user.username}`);
		}
		dispatch(closeNotificationsModal());
	};

	return (
		<li className={styles.Like}>
			<div className={styles.StoryLink} onClick={handleFollowClick}>
				<div className={styles.UserImgWr}>
					{/* <img src={user.image || defaultImg} alt="Profile picture" className={styles.UserImg} /> */}
				</div>
				<div className={styles.LikeInfo}>
					{amount ? (
						<p className={styles.Users}>
							<span className={styles.UserTitle}>{users[0].title}</span>
							<span>, </span>
							<span className={styles.UserTitle}>{users[1].title}</span>
							{amount - 2 > 1 && <span className={styles.Others}> and {amount - 2} others</span>}
						</p>
					) : (
						<span className={styles.UserTitle}>{user.title}</span>
					)}
					<p className={styles.LikeNote}>
						{parentComment ? 'liked your comment.' : 'liked your story.'}
						<span className={styles.LikeDate}>{date}</span>
					</p>
					{parentComment && (
						<div className={styles.ParentComment}>
							{parentComment.user.title}: {parentComment.text}
						</div>
					)}
				</div>
				<div className={styles.Story}></div>
			</div>
		</li>
	);
};

export default Like;
