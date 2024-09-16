import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import cn from 'classnames';
import styles from './Comment.module.scss';
import defaultImg from '@/assets/images/default.svg';
import { ReactComponent as LikeIcon } from '@/assets/icons/like.svg';
import { formatNumber } from '@/utils/formatUtils';
import type { Comment as CommentType } from '@/types/Comment';
import { openAuthModal } from '@/features/auth/authSlice';
import { ReactComponent as ReportIcon } from '@/assets/icons/report.svg';
import { ReactComponent as DeleteIcon } from '@/assets/icons/comments/delete.svg';
import { openReport } from '@/features/report/reportSlice';
import ButtonWithActionsMenu from '@/components/ButtonWithActionsMenu/ButtonWithActionsMenu';
import { MENU_POSITION } from '@/constants/ui';
import { displayDate } from '@/utils/dateUtils';
import useCommentLike from '@/hooks/interaction/useCommentLike';
import { DELETE_COMMENT } from '@/graphql/comments/mutations';
import { wrapMentions } from '@/utils/textUtils';

type CommentProps = {
	comment: CommentType;
	reply: boolean;
	isAuth: boolean;
	currentUserId: string;
	handleLikeComment: () => void;
	handleUnlikeComment: () => void;
	handleDeleteComment: () => void;
	setRepliedComment: () => void;
};

const Comment = (props: CommentProps) => {
	const dispatch = useDispatch();
	const { comment, reply, isAuth, currentUserId } = props;
	const { handleLikeComment, handleUnlikeComment, handleDeleteComment, setRepliedComment } = props;
	const { id, user, content, createdAt, isLiked, likesCount } = comment;

	const [deleteComment] = useMutation(DELETE_COMMENT, {
		variables: {
			deleteCommentInput: {
				commentId: id,
			},
		},
		onCompleted() {
			handleDeleteComment();
		},
	});

	const { handleLike } = useCommentLike({
		isAuth,
		commentId: id,
		isLiked,
		likeCallback: handleLikeComment,
		unlikeCallback: handleUnlikeComment,
	});

	const handleReply = () => {
		if (!isAuth) {
			dispatch(openAuthModal());
		} else {
			setRepliedComment();
		}
	};

	const handleOpenReport = () => {
		dispatch(openReport({ type: 'comment', targetId: id }));
	};

	let actions = [
		{
			name: 'Report',
			iconComponent: <ReportIcon />,
			onClick: handleOpenReport,
		},
	];

	if (currentUserId === user.id) {
		actions = [
			{
				name: 'Delete',
				iconComponent: <DeleteIcon />,
				onClick: deleteComment,
			},
		];
	}

	return (
		<div className={cn(styles.Comment, reply && styles.Reply)}>
			<div className={styles.ProfileImgSection}>
				<Link to={`/@${user.username}`} className={styles.ImgUserLink}>
					<img src={user.imageUrl || defaultImg} alt="Profile picture" className={styles.ProfileImg} />
				</Link>
			</div>
			<div className={styles.CommentContent}>
				<Link to={`/@${user.username}`} className={styles.UserLink}>
					<span className={styles.DisplayName}>{user.displayName}</span>
				</Link>
				<p className={styles.CommentText}>{wrapMentions(content, styles.Mention)}</p>
				<div className={styles.BottomInfo}>
					<span className={styles.CommentDate}>{displayDate(createdAt)}</span>
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
					<LikeIcon className={cn(styles.LikeIcon, isLiked && styles.Liked)} />
					<span className={styles.LikesCount}>{formatNumber(likesCount)}</span>
				</div>
			</div>
		</div>
	);
};

export default Comment;
