import React, {useRef} from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
	const searchInputRef = useRef(null);
	const {
		date,
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
				<div className={styles.UserImgWr}>
					<img src={image || defaultImg} alt="Profile picture" className={styles.UserImg} />
				</div>
				<div className={styles.UserInfo}>
					<span className={styles.UserTitle}>{title}</span>
					<Link ref={searchInputRef} to='/tag/123' className={styles.FollowDate}>{date}</Link>
				</div>
			</div>
		</li>
	);
};

export default Comment;
