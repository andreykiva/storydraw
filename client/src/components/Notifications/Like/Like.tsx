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

type CommentProps = {
	id: string;
	text: string;
	date: string;
	parentComment: ParentComment | null;
	story: {
		id: string;
		preview: StoryImages;
	};
	user: Pick<User, 'id' | 'username' | 'title' | 'image'>;
};

const Like = (props: CommentProps) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const searchInputRef = useRef(null);
	const {
		text,
		date,
		parentComment,
		user: { username, title, image },
	} = props;

	const handleFollowClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!searchInputRef.current.contains(e.target as Node)) {
			navigate(`/@${username}`);
		}
		dispatch(closeNotificationsModal());
	};

	return (
		<li className={styles.Comment}>
			<div className={styles.CommentLink} onClick={handleFollowClick}>
				<div className={styles.AuthorImgWr}>
					<img src={image || defaultImg} alt="Profile picture" className={styles.AuthorImg} />
				</div>
				<div className={styles.CommentInfo}>
					<span className={styles.AuthorTitle}>{title}</span>
					<p className={styles.CommentContent}>
						<span className={styles.CommentNote}>
							{parentComment ? 'replied to your comment:' : 'commented on your story:'}
						</span>
						<span className={styles.CommentNote}></span>
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

export default Like;
