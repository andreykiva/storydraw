import { useState } from 'react';
import { useQuery } from '@apollo/client';
import styles from './Replies.module.scss';
import Comment from '@/pages/Story/Comments/CommentSection/Comment/Comment';
import type { Comment as CommentType, RepliedComment } from '@/types/Comment';
import { ReactComponent as ArrowIcon } from '@/assets/icons/arrow.svg';
import { GET_REPLIES } from '@/graphql/comments/queries';
import Loader from '@/components/ui/Loader/Loader';
import { REPLIES_LIMIT } from '@/constants/pagination';

type RepliesProps = {
	isAuth: boolean;
	comment: CommentType;
	currentUserId: string;
	handleLikeReply: (commentId: string, replyId: string) => void;
	handleUnlikeReply: (commentId: string, replyId: string) => void;
	handleRemoveReply: (commentId: string, replyId: string) => void;
	addReplies: (commentId: string, replies: CommentType[]) => void;
	setRepliedComment: (repliedComment: RepliedComment | null) => void;
	handleCloseReplies: () => void;
};

const Replies = (props: RepliesProps) => {
	const { isAuth, comment, currentUserId } = props;
	const { handleLikeReply, handleUnlikeReply, handleRemoveReply, addReplies, setRepliedComment, handleCloseReplies } = props;
	const isAllRepliesLoaded = comment.replies && comment.replies.length >= comment.repliesCount;
	const hasReplies = comment.replies && comment.replies.length >= 0;
	const [cursor, setCursor] = useState(null);

	const { loading, error } = useQuery(GET_REPLIES, {
		variables: {
			getRepliesInput: {
				commentId: comment.id,
			},
			paginationInput: {
				limit: REPLIES_LIMIT,
				cursor,
			},
			isAuth,
		},
		notifyOnNetworkStatusChange: true,
		skip: isAllRepliesLoaded || (hasReplies && !cursor),
		onCompleted(data) {
			addReplies(comment.id, data.getReplies);
		},
	});

	if (error) {
		return <div>Error... {error.graphQLErrors[0]?.message}</div>;
	}

	const handleSetRepliedComment = (reply: CommentType) => {
		setRepliedComment({
			id: reply.id,
			content: reply.content,
			user: {
				displayName: reply.user.displayName,
			},
			parentCommentId: comment.id,
		});
	};

	const handleChangeCursor = () => {
		const lastReply = comment.replies[comment.replies.length - 1];
		setCursor(lastReply.createdAt);
	};

	return (
		<div className={styles.Replies}>
			{comment.replies?.map((reply) => (
				<div key={reply.id} className={styles.Reply}>
					<Comment
						reply={true}
						comment={reply}
						isAuth={isAuth}
						currentUserId={currentUserId}
						handleLikeComment={() => handleLikeReply(comment.id, reply.id)}
						handleUnlikeComment={() => handleUnlikeReply(comment.id, reply.id)}
						handleRemoveComment={() => handleRemoveReply(comment.id, reply.id)}
						setRepliedComment={() => handleSetRepliedComment(reply)}
					/>
				</div>
			))}
			{loading ? (
				<Loader className={styles.Loader} />
			) : (
				<div className={styles.RepliesActions}>
					{comment.repliesCount > comment.replies?.length && (
						<div className={styles.ViewMoreRepliesBtn} onClick={handleChangeCursor}>
							View {comment.repliesCount - comment.replies.length} more
							<ArrowIcon className={styles.ArrowIcon} />
						</div>
					)}
					<div className={styles.HideRepliesBtn} onClick={handleCloseReplies}>
						Hide
						<ArrowIcon className={styles.ArrowIcon} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Replies;
