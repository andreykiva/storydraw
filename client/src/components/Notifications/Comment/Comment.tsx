import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Comment.module.css';
import type User from '@/types/User';
import defaultImg from '@/assets/icons/default.svg';
import { closeNotificationsModal } from '@/features/notifications/notificationsSlice';

type ParentComment = {
	id: string;
	text: string;
};

type StoryImages = {
	image: string;
};

type CommentProps = {
	id: string;
	date: string;
	parentComment: ParentComment | null;
	story: {
		id: string;
		preview: StoryImages;
	};
	user: Pick<User, 'id' | 'username' | 'title' | 'image'>;
};

const Comment = (props: CommentProps) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		date,
		user: { username, title, image },
	} = props;

	const handleFollowClick = () => {
		dispatch(closeNotificationsModal());
		navigate(`/@${username}`);
	};

	return (
		<div className={styles.Follow}>
			<div className={styles.UserLink} onClick={handleFollowClick}>
				<div className={styles.UserImgWr}>
					<img src={image || defaultImg} alt="Profile picture" className={styles.UserImg} />
				</div>
				<div className={styles.UserInfo}>
					<span className={styles.UserTitle}>{title}</span>
					<span className={styles.FollowDate}>{date}</span>
				</div>
			</div>
		</div>
	);
};

export default Comment;
