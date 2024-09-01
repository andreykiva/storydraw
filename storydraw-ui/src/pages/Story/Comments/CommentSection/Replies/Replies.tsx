import React, { useState } from 'react';
import styles from './Replies.module.scss';
import Comment from '@/pages/Story/Comments/CommentSection/Comment/Comment';
import type { Comment as CommentType, RepliedComment } from '@/types/Comment';
import { GET_REPLIES } from '@/graphql/comments/queries';
import { useQuery } from '@apollo/client';
import Loader from '@/components/ui/Loader/Loader';

type RepliesProps = {
	isAuth: boolean;
	comment: CommentType;
	currentUserId: string;
	handleLikeReply: (commentId: string, replyId: string) => void;
	handleUnlikeReply: (commentId: string, replyId: string) => void;
	handleDeleteReply: (commentId: string, replyId: string) => void;
	addReplies: (commentId: string, replies: CommentType[]) => void;
	setRepliedComment: (repliedComment: RepliedComment | null) => void;
};

const Replies = (props: RepliesProps) => {
	const { isAuth, comment, currentUserId } = props;
	const { handleLikeReply, handleUnlikeReply, handleDeleteReply, addReplies, setRepliedComment } = props;
	const isRepliesLoaded = comment.replies && comment.replies.length > 0;
	const [isLoaded, setIsLoaded] = useState(isRepliesLoaded);

	const { loading, error } = useQuery(GET_REPLIES, {
		variables: {
			getRepliesInput: {
				commentId: comment.id,
			},
			isAuth,
		},
		skip: isRepliesLoaded,
		onCompleted(data) {
			addReplies(comment.id, data.getReplies);
			setIsLoaded(true);
		},
	});

	if (loading || !isLoaded) {
		return <Loader />;
	}

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

	return (
		<div className={styles.Replies}>
			{comment.replies.map((reply) => (
				<div key={reply.id} className={styles.Reply}>
					<Comment
						reply={true}
						comment={reply}
						isAuth={isAuth}
						currentUserId={currentUserId}
						handleLikeComment={() => handleLikeReply(comment.id, reply.id)}
						handleUnlikeComment={() => handleUnlikeReply(comment.id, reply.id)}
						handleDeleteComment={() => handleDeleteReply(comment.id, reply.id)}
						setRepliedComment={() => handleSetRepliedComment(reply)}
					/>
				</div>
			))}
		</div>
	);
};

export default Replies;
