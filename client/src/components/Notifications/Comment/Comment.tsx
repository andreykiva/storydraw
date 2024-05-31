import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Comment.module.scss';
import defaultImg from '@/assets/images/default.svg?url';
import { closeNotificationsModal } from '@/features/notifications/notificationsSlice';
import type { CommentNotification } from '@/types/Notification';
import { displayDate } from '@/utils/dateUtils';

const Comment = (props: CommentNotification) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const authorNameRef = useRef<HTMLAnchorElement>(null);
	const authorImgRef = useRef<HTMLImageElement>(null);
	const {
		text,
		date,
		parentComment,
		story,
		user: { username, name, image },
	} = props;

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!authorNameRef.current.contains(e.target as Node) && !authorImgRef.current.contains(e.target as Node)) {
			navigate(`/@${username}/story/${story.id}`);
		}
		dispatch(closeNotificationsModal());
	};

	return (
		<li className={styles.Comment}>
			<div className={styles.CommentLink} onClick={handleClick}>
				<Link to={`/@${username}`} className={styles.AuthorImgWr}>
					<img
						src={image || defaultImg}
						alt="Profile picture"
						className={styles.AuthorImg}
						ref={authorImgRef}
					/>
				</Link>
				<div className={styles.CommentInfo}>
					<Link to={`/@${username}`} className={styles.AuthorName} ref={authorNameRef}>
						{name}
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
							{parentComment.user.name}: {parentComment.text}
						</div>
					)}
				</div>
				<div className={styles.Story}></div>
			</div>
		</li>
	);
};

export default Comment;
