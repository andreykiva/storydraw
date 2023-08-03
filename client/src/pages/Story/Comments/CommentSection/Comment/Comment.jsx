import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Comment.module.css';
import defaultImg from '../../../../../assets/icons/default.svg';
import LikeIcon from '../../../../../UI/icons/LikeIcon';
import { formatNumber } from '../../../../../utils/numberUtils';

const Comment = (props) => {
	const { user, id, text, date, likes, reply = false } = props;

	return (
		<div className={[styles.Comment, reply ? styles.Reply : ''].join(' ')}>
			<div className={styles.UserImg}>
				<Link to={`/@${user.username}`}>
					<img src={user.image || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
				</Link>
			</div>
			<div className={styles.CommentInfo}>
				<Link to={`/@${user.username}`} className={styles.UserLink}>
					<div className={styles.UserTitle}>{user.title}</div>
				</Link>
				<p className={styles.CommentText}>{text}</p>
				<div className={styles.BottomInfo}>
					<span className={styles.CommentDate}>{date}</span>
					<span className={styles.ReplyBtn}>Reply</span>
				</div>
			</div>
			<div className={styles.CommentLikes}>
				<div className={styles.LikeBtn}>
					<LikeIcon className={styles.LikeIcon} />
					<span className={styles.LikesAmount}>{formatNumber(likes)}</span>
				</div>
			</div>
		</div>
	);
};

export default Comment;
