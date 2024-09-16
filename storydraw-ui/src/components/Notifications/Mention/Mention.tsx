import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Mention.module.scss';
import defaultImg from '@/assets/images/default.svg';
import { closeNotificationsModal } from '@/features/notifications/notificationsSlice';
import type { MentionNotification } from '@/types/Notification';
import { displayDate } from '@/utils/dateUtils';
import storyImg from '@/assets/images/preview.jpg';

type MentionProps = {
	notification: MentionNotification;
};

const Mention = ({ notification }: MentionProps) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userNameRef = useRef<HTMLAnchorElement>(null);
	const userImgRef = useRef<HTMLImageElement>(null);
	const { createdAt, comment, initiator, story } = notification;

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!userNameRef.current.contains(e.target as Node) && !userImgRef.current.contains(e.target as Node)) {
			navigate(`/@${story.user.username}/story/${story.id}`);
		}
		dispatch(closeNotificationsModal());
	};

	return (
		<li className={styles.Mention}>
			<div className={styles.StoryLink} onClick={handleClick}>
				<Link to={`/@${initiator.username}`} className={styles.UserImgWr}>
					<img src={initiator.imageUrl || defaultImg} alt="Profile picture" className={styles.UserImg} ref={userImgRef} />
				</Link>
				<div className={styles.MentionInfo}>
					<Link to={`/@${initiator.username}`} className={styles.DisplayName} ref={userNameRef}>
						{initiator.displayName}
					</Link>
					<p className={styles.MentionContent}>
						<span>
							{comment ? 'mentioned you in a comment: ' : 'mentioned you in a story: '}
							{comment ? (
								<span className={styles.CommentText}>{comment.content}</span>
							) : (
								<span className={styles.StoryDescr}>{story.description}</span>
							)}
						</span>
						<span className={styles.MentionDate}>{displayDate(createdAt)}</span>
					</p>
				</div>
				<div className={styles.Story}>
					<img src={storyImg} alt="Story preview" className={styles.StoryImg} />
				</div>
			</div>
		</li>
	);
};

export default Mention;
