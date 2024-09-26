import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import type { Comment, RepliedComment } from '@/types/Comment';
import { GET_COMMENTS } from '@/graphql/comments/queries';
import { COMMENTS_LIMIT } from '@/constants/pagination';

type UseCommentsProps = {
	storyId: string;
	isAuth: boolean;
};

const useComments = ({ storyId, isAuth }: UseCommentsProps) => {
	const [comments, setComments] = useState<Comment[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [repliedComment, setRepliedComment] = useState<RepliedComment | null>(null);
	const [hasMore, setHasMore] = useState(true);
	const [cursor, setCursor] = useState(null);

	const { loading, error } = useQuery(GET_COMMENTS, {
		variables: {
			getCommentsInput: {
				storyId,
			},
			paginationInput: {
				limit: COMMENTS_LIMIT,
				cursor,
			},
			isAuth,
		},
		notifyOnNetworkStatusChange: true,
		fetchPolicy: 'no-cache',
		onCompleted(data) {
			const newComments = data.getComments;
			setComments((prevComments) => [...prevComments, ...newComments]);
			setIsLoaded(true);

			if (newComments.length < COMMENTS_LIMIT) {
				setHasMore(false);
			}
		},
	});

	useEffect(() => {
		setIsLoaded(false);
		setComments([]);
		setRepliedComment(null);
		setHasMore(true);
		setCursor(null);
	}, [storyId]);

	const handleChangeCursor = () => {
		const lastComment = comments[comments.length - 1];
		setCursor(lastComment.createdAt);
	};

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
					replies: [...(comment.replies || []), ...replies],
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
		const updatedComments = comments.map((comment) => {
			if (comment.id === commentId) {
				if (comment.replies) {
					const updatedReplies = [newReply, ...comment.replies];

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
		handleChangeCursor,
		hasMore,
	};
};

export default useComments;
