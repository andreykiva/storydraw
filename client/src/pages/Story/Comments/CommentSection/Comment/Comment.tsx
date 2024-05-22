import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import styles from './Comment.module.scss';
import defaultImg from '@/assets/images/default.svg?url';
import LikeIcon from '@/assets/icons/like.svg';
import { formatNumber } from '@/utils/numberUtils';
import type Comment from '@/types/Comment';
import type User from '@/types/User';
import { openAuthModal } from '@/features/auth/authSlice';
import { selectAuth } from '@/features/auth/authSlice';
import ReportIcon from '@/assets/icons/report.svg';
import { openReport } from '@/features/report/reportSlice';
import ButtonWithActionsMenu from '@/components/ButtonWithActionsMenu/ButtonWithActionsMenu';
import { MENU_POSITION } from '@/constants/position';

type CommentProps = Comment & {
	user: Pick<User, 'username' | 'title' | 'image'>;
	reply: boolean;
};

const Comment = (props: CommentProps) => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectAuth);
	const { id, user, text, date, likes, reply } = props; // + id

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

	const handleOpenReport = () => {
		dispatch(openReport({ type: 'comment', targetId: id }));
	};

	const actions = [
		{
			name: 'Report',
			iconComponent: <ReportIcon />,
			onClick: handleOpenReport,
		},
	];

	return (
		<div className={cn(styles.Comment, reply && styles.Reply)}>
			<div className={styles.ProfileImgSection}>
				<Link to={`/@${user.username}`} className={styles.ImgUserLink}>
					<img src={user.image || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
				</Link>
			</div>
			<div className={styles.CommentContent}>
				<Link to={`/@${user.username}`} className={styles.UserLink}>
					<span className={styles.UserTitle}>{user.title}</span>
				</Link>
				<p className={styles.CommentText}>{text}</p>
				<div className={styles.BottomInfo}>
					<span className={styles.CommentDate}>{date}</span>
					<span className={styles.ReplyBtn} onClick={handleReply}>
						Reply
					</span>
				</div>
			</div>
			<div className={styles.CommentInteraction}>
				<ButtonWithActionsMenu
					actions={actions}
					menuPosition={MENU_POSITION.BOTTOM_LEFT}
					buttonClassName={styles.ActionsBtn}
					menuClassName={styles.ActionsMenu}
				/>
				<div className={styles.LikeBtn} onClick={handleLike}>
					<LikeIcon className={styles.LikeIcon} />
					<span className={styles.LikesAmount}>{formatNumber(likes)}</span>
				</div>
			</div>
		</div>
	);
};

export default Comment;
