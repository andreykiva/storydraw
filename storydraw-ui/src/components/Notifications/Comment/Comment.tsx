import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Comment.module.scss';
import defaultImg from '@/assets/images/default.svg';
import { closeNotificationsModal } from '@/features/notifications/notificationsSlice';
import type { CommentNotification } from '@/types/Notification';
import { displayDate } from '@/utils/dateUtils';
import { UserState } from '@/features/user/userSlice';
import storyImg from '@/assets/images/preview.jpg';

type CommentProps = {
	notification: CommentNotification;
	currentUser: UserState;
};

const Comment = ({ notification, currentUser }: CommentProps) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const authorNameRef = useRef<HTMLAnchorElement>(null);
	const authorImgRef = useRef<HTMLImageElement>(null);
	const { createdAt, comment, initiator, story } = notification;

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!authorNameRef.current.contains(e.target as Node) && !authorImgRef.current.contains(e.target as Node)) {
			navigate(`/@${story.user.username}/story/${story.id}`);
		}
		dispatch(closeNotificationsModal());
	};

	const parent = comment.parentReply || comment.parentComment;
	const isParentMe = parent && parent.user.id === currentUser.id;

	return (
		<li className={styles.Comment}>
			<div className={styles.CommentLink} onClick={handleClick}>
				<Link to={`/@${initiator.username}`} className={styles.AuthorImgWr}>
					<img src={initiator.imageUrl || defaultImg} alt="Profile picture" className={styles.AuthorImg} ref={authorImgRef} />
				</Link>
				<div className={styles.CommentInfo}>
					<Link to={`/@${initiator.username}`} className={styles.AuthorDisplayName} ref={authorNameRef}>
						{initiator.displayName}
					</Link>
					<p className={styles.CommentContent}>
						<span>
							{isParentMe ? 'replied to your comment: ' : 'commented on your story: '}
							<span className={styles.CommentText}>{comment.content}</span>
						</span>
						<span className={styles.CommentDate}>{displayDate(createdAt)}</span>
					</p>
					{isParentMe && (
						<div className={styles.ParentComment}>
							{currentUser.displayName}: {parent.content}
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

export default Comment;
