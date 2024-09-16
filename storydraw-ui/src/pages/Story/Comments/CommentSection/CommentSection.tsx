import React, { useEffect, useState } from 'react';
import styles from './CommentSection.module.scss';
import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow.svg';
import Comment from './Comment/Comment';
import Replies from './Replies/Replies';
import { formatNumber } from '@/utils/formatUtils';
import type { Comment as CommentType, RepliedComment } from '@/types/Comment';

type CommentSection = {
	comment: CommentType;
	isAuth: boolean;
	currentUserId: string;
	handleLikeComment: (commentId: string) => void;
	handleLikeReply: (commentId: string, replyId: string) => void;
	handleUnlikeComment: (commentId: string) => void;
	handleUnlikeReply: (commentId: string, replyId: string) => void;
	handleDeleteComment: (commentId: string) => void;
	handleDeleteReply: (commentId: string, replyId: string) => void;
	addReplies: (commentId: string, replies: CommentType[]) => void;
	setRepliedComment: (repliedComment: RepliedComment | null) => void;
};

const CommentSection = (props: CommentSection) => {
	const { comment, isAuth, currentUserId } = props;
	const {
		handleLikeComment,
		handleLikeReply,
		handleUnlikeComment,
		handleUnlikeReply,
		handleDeleteComment,
		handleDeleteReply,
		addReplies,
		setRepliedComment,
	} = props;
	const [showReplies, setShowReplies] = useState(false);
	const { repliesCount } = comment;

	const handleToggleReplies = () => {
		setShowReplies(!showReplies);
	};

	useEffect(() => {
		if (!repliesCount) {
			setShowReplies(false);
		}
	}, [repliesCount]);

	const handleSetRepliedComment = () => {
		setRepliedComment({
			id: comment.id,
			content: comment.content,
			user: {
				displayName: comment.user.displayName,
			},
			parentCommentId: comment.id,
		});
	};

	return (
		<div className={styles.CommentSection}>
			<Comment
				reply={false}
				comment={comment}
				isAuth={isAuth}
				currentUserId={currentUserId}
				handleLikeComment={() => handleLikeComment(comment.id)}
				handleUnlikeComment={() => handleUnlikeComment(comment.id)}
				handleDeleteComment={() => handleDeleteComment(comment.id)}
				setRepliedComment={() => handleSetRepliedComment()}
			/>
			{repliesCount > 0 && !showReplies ? (
				<div className={styles.ViewRepliesBtn} onClick={handleToggleReplies}>
					View {formatNumber(repliesCount)} Replies
					<ArrowIcon className={styles.ArrowIcon} />
				</div>
			) : null}

			{showReplies && (
				<Replies
					isAuth={isAuth}
					comment={comment}
					currentUserId={currentUserId}
					handleLikeReply={handleLikeReply}
					handleUnlikeReply={handleUnlikeReply}
					handleDeleteReply={handleDeleteReply}
					addReplies={addReplies}
					setRepliedComment={setRepliedComment}
				/>
			)}

			{showReplies && (
				<div className={styles.HideReplies}>
					<div className={styles.HideRepliesBtn} onClick={handleToggleReplies}>
						Hide
						<ArrowIcon className={styles.ArrowIcon} />
					</div>
				</div>
			)}
		</div>
	);
};

export default CommentSection;
