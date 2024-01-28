import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
		author: Pick<User, 'id' | 'username'>;
	};
	user?: LikedUser;
	amount?: number;
	users?: LikedUser[];
};

const Like = (props: LikeProps) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userTitleRef = useRef<HTMLAnchorElement>(null);
	const userImgRef = useRef<HTMLImageElement>(null);
	const otherUsersOneRef = useRef<HTMLAnchorElement>(null);
	const otherUsersTwoRef = useRef<HTMLAnchorElement>(null);
	const { date, parentComment, user, users, amount, story } = props;

	const handleStoryClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const isSingleUserClick =
			!amount &&
			!userTitleRef.current.contains(e.target as Node) &&
			!userImgRef.current.contains(e.target as Node);

		const isMultiUserClick =
			amount &&
			!otherUsersOneRef.current.contains(e.target as Node) &&
			!otherUsersTwoRef.current.contains(e.target as Node);

		if (isSingleUserClick || isMultiUserClick) {
			navigate(`/@${story.author.username}/story/${story.id}`);
			dispatch(closeNotificationsModal());
		}
	};

	return (
		<li className={styles.Like}>
			<div className={styles.StoryLink} onClick={handleStoryClick}>
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
							<Link to={`/@${users[0].username}`} className={styles.UserTitle} ref={otherUsersOneRef}>
								{users[0].title}
							</Link>
							<span>, </span>
							<Link to={`/@${users[1].username}`} className={styles.UserTitle} ref={otherUsersTwoRef}>
								{users[1].title}
							</Link>
							{amount - 2 > 1 && <span className={styles.Others}> and {amount - 2} others</span>}
						</p>
					) : (
						<Link to={`/@${user.username}`} className={styles.UserTitle} ref={userTitleRef}>
							{user.title}
						</Link>
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
