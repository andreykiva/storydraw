import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Comment.module.css';
import defaultImg from '@/assets/images/default.svg?url';
import { closeNotificationsModal } from '@/features/notifications/notificationsSlice';
import type { CommentNotification } from '@/types/Notification';
import { displayDate } from '@/utils/dateUtils';

const Comment = (props: CommentNotification) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const authorTitleRef = useRef<HTMLAnchorElement>(null);
	const authorImgRef = useRef<HTMLImageElement>(null);
	const {
		text,
		date,
		parentComment,
		story,
		user: { username, title, image },
	} = props;

	const handleAuthorClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!authorTitleRef.current.contains(e.target as Node) && !authorImgRef.current.contains(e.target as Node)) {
			navigate(`/@${username}/story/${story.id}`);
		}
		dispatch(closeNotificationsModal());
	};

	return (
		<li className={styles.Comment}>
			<div className={styles.CommentLink} onClick={handleAuthorClick}>
				<Link to={`/@${username}`} className={styles.AuthorImgWr}>
					<img
						src={image || defaultImg}
						alt="Profile picture"
						className={styles.AuthorImg}
						ref={authorImgRef}
					/>
				</Link>
				<div className={styles.CommentInfo}>
					<Link to={`/@${username}`} className={styles.AuthorTitle} ref={authorTitleRef}>
						{title}
					</Link>
					<p className={styles.CommentContent}>
						<span className={styles.CommentNote}>
							{parentComment ? 'replied to your comment:' : 'commented on your story:'}
						</span>
						{text}
						<span className={styles.CommentDate}>{displayDate(date)}</span>
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

export default Comment;
