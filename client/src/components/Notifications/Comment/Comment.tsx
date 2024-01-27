import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Comment.module.css';
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

type CommentProps = {
	id: string;
	text: string;
	date: string;
	parentComment?: ParentComment;
	story: {
		id: string;
		preview: StoryImages;
	};
	user: Pick<User, 'id' | 'username' | 'title' | 'image'>;
};

const Comment = (props: CommentProps) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const authorTitleRef = useRef(null);
	const authorImgRef = useRef(null);
	const {
		text,
		date,
		parentComment,
		story,
		user: { username, title, image },
	} = props;

	const handleAuthorClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (authorTitleRef.current.contains(e.target as Node) || authorImgRef.current.contains(e.target as Node)) {
			navigate(`/@${username}`);
		} else {
			navigate(`/@${username}/story/${story.id}`);
		}
		dispatch(closeNotificationsModal());
	};

	return (
		<li className={styles.Comment}>
			<div className={styles.CommentLink} onClick={handleAuthorClick}>
				<div className={styles.AuthorImgWr}>
					<img
						src={image || defaultImg}
						alt="Profile picture"
						className={styles.AuthorImg}
						ref={authorImgRef}
					/>
				</div>
				<div className={styles.CommentInfo}>
					<span className={styles.AuthorTitle} ref={authorTitleRef}>
						{title}
					</span>
					<p className={styles.CommentContent}>
						<span className={styles.CommentNote}>
							{parentComment ? 'replied to your comment:' : 'commented on your story:'}
						</span>
						{text}
						<span className={styles.CommentDate}>{date}</span>
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
