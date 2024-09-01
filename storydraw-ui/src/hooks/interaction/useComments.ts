import { useQuery } from '@apollo/client';
import { useState } from 'react';
import type { Comment, RepliedComment } from '@/types/Comment';
import { GET_COMMENTS } from '@/graphql/comments/queries';

type UseCommentsProps = {
	storyId: string;
	isAuth: boolean;
};

const useComments = ({ storyId, isAuth }: UseCommentsProps) => {
	const [comments, setComments] = useState<Comment[]>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [repliedComment, setRepliedComment] = useState<RepliedComment | null>(null);

	const { loading, error } = useQuery(GET_COMMENTS, {
		variables: {
			getCommentsInput: {
				storyId,
			},
			isAuth,
		},
		fetchPolicy: 'no-cache',
		onCompleted(data) {
			setComments(data.getComments);
			setIsLoaded(true);
		},
	});

	const handleDeleteComment = (commentId: string) => {
		const updatedComments = comments.filter((comment) => comment.id !== commentId);
		setComments(updatedComments);
	};

	const handleDeleteReply = (commentId: string, replyId: string) => {
		const updatedComments = comments.map((comment) => {
			if (comment.id === commentId) {
				const updatedReplies = comment.replies?.filter((reply) => reply.id !== replyId) || [];
				const updatedRepliesCount = comment.repliesCount ? comment.repliesCount - 1 : 0;

				return {
					...comment,
					replies: updatedReplies,
					repliesCount: updatedRepliesCount,
				};
			}
			return comment;
		});

		setComments(updatedComments);
	};

	const handleLikeComment = (commentId: string) => {
		const updatedComments = comments.map((comment) => {
			if (comment.id === commentId) {
				return {
					...comment,
					isLiked: true,
					likesCount: comment.likesCount + 1,
				};
			}
			return comment;
		});

		setComments(updatedComments);
	};

	const handleLikeReply = (commentId: string, replyId: string) => {
		const updatedComments = comments.map((comment) => {
			if (comment.id === commentId) {
				const updatedReplies =
					comment.replies?.map((reply) => {
						if (reply.id === replyId) {
							return {
								...reply,
								isLiked: true,
								likesCount: reply.likesCount + 1,
							};
						}
						return reply;
					}) || [];

				return {
					...comment,
					replies: updatedReplies,
				};
			}
			return comment;
		});

		setComments(updatedComments);
	};

	const handleUnlikeComment = (commentId: string) => {
		const updatedComments = comments.map((comment) => {
			if (comment.id === commentId) {
				return {
					...comment,
					isLiked: false,
					likesCount: comment.likesCount - 1,
				};
			}
			return comment;
		});

		setComments(updatedComments);
	};

	const handleUnlikeReply = (commentId: string, replyId: string) => {
		const updatedComments = comments.map((comment) => {
			if (comment.id === commentId) {
				const updatedReplies =
					comment.replies?.map((reply) => {
						if (reply.id === replyId) {
							return {
								...reply,
								isLiked: false,
								likesCount: reply.likesCount - 1,
							};
						}
						return reply;
					}) || [];

				return {
					...comment,
					replies: updatedReplies,
				};
			}
			return comment;
		});

		setComments(updatedComments);
	};

	const addReplies = (commentId: string, replies: Comment[]) => {
		const updatedComments = comments.map((comment) => {
			if (comment.id === commentId) {
				return {
					...comment,
					replies,
				};
			}
			return comment;
		});

		setComments(updatedComments);
	};

	const handleCreateComment = (newComment: Comment) => {
		const updatedComments = [newComment, ...comments];
		setComments(updatedComments);
	};

	const handleCreateReply = (commentId: string, newReply: Comment) => {
		console.log(commentId);
		console.log(newReply);
		const updatedComments = comments.map((comment) => {
			if (comment.id === commentId) {
				if (comment.replies) {
					const updatedReplies = [...comment.replies, newReply];

					return {
						...comment,
						replies: updatedReplies,
						repliesCount: comment.repliesCount + 1,
					};
				}
				return {
					...comment,
					repliesCount: comment.repliesCount + 1,
				};
			}
			return comment;
		});

		setComments(updatedComments);
	};

	return {
		comments,
		loading,
		error,
		isLoaded,
		repliedComment,
		handleLikeComment,
		handleLikeReply,
		handleUnlikeComment,
		handleUnlikeReply,
		handleDeleteComment,
		handleDeleteReply,
		addReplies,
		handleCreateComment,
		handleCreateReply,
		setRepliedComment,
	};
};

export default useComments;
