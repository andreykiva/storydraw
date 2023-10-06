import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Comment.module.css';
import defaultImg from '@/assets/icons/default.svg';
import LikeIcon from '@/components/ui/icons/LikeIcon';
import { formatNumber } from '@/utils/numberUtils';
import type Comment from '@/types/Comment';
import type User from '@/types/User';
import { openAuthModal } from '@/features/auth/authSlice';
import { selectAuth } from '@/features/auth/authSlice';

type CommentProps = Comment & {
	user: Pick<User, 'username' | 'title' | 'image'>;
	reply: boolean;
};

const Comment = (props: CommentProps) => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectAuth);
	const { user, text, date, likes, reply } = props; // + id

	const handleReply = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
		} else {
			// Reply
		}
	};

	const handleLike = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
		} else {
			// Like
		}
	};

	return (
		<div className={[styles.Comment, reply ? styles.Reply : ''].join(' ')}>
			<div className={styles.ProfileImgSection}>
				<Link to={`/@${user.username}`} className={styles.ImgUserLink}>
					<img src={user.image || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
				</Link>
			</div>
			<div className={styles.CommentInfo}>
				<Link to={`/@${user.username}`} className={styles.UserLink}>
					<span className={styles.UserTitle}>{user.title}</span>
				</Link>
				<p className={styles.CommentText}>{text}</p>
				<div className={styles.BottomInfo}>
					<span className={styles.CommentDate}>{date}</span>
					<span className={styles.ReplyBtn} onClick={handleReply}>Reply</span>
				</div>
			</div>
			<div className={styles.CommentLikes}>
				<div className={styles.LikeBtn} onClick={handleLike}>
					<LikeIcon className={styles.LikeIcon} />
					<span className={styles.LikesAmount}>{formatNumber(likes)}</span>
				</div>
			</div>
		</div>
	);
};

export default Comment;
