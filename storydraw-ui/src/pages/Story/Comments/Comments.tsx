import styles from './Comments.module.scss';
import CommentSection from './CommentSection/CommentSection';
import Loader from '@/components/ui/Loader/Loader';
import useComments from '@/hooks/interaction/useComments';
import CreateComment from './CreateComment/CreateComment';

type CommentsProps = {
	storyId: string;
	isAuth: boolean;
	currentUserId: string;
};

const Comments = ({ storyId, isAuth, currentUserId }: CommentsProps) => {
	const {
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
	} = useComments({ storyId, isAuth });

	if (loading || !isLoaded) {
		return <Loader />;
	}

	if (error) {
		return <div>Error... {error.graphQLErrors[0]?.message}</div>;
	}

	return (
		<div className={styles.CommentsPanel}>
			<div className={styles.Comments}>
				{comments.length ? (
					comments.map((comment) => (
						<CommentSection
							key={comment.id}
							comment={comment}
							isAuth={isAuth}
							currentUserId={currentUserId}
							handleLikeComment={handleLikeComment}
							handleLikeReply={handleLikeReply}
							handleUnlikeComment={handleUnlikeComment}
							handleUnlikeReply={handleUnlikeReply}
							handleDeleteComment={handleDeleteComment}
							handleDeleteReply={handleDeleteReply}
							addReplies={addReplies}
							setRepliedComment={setRepliedComment}
						/>
					))
				) : (
					<div>No comments</div>
				)}
			</div>
			<CreateComment
				isAuth={isAuth}
				storyId={storyId}
				repliedComment={repliedComment}
				handleCreateComment={handleCreateComment}
				handleCreateReply={handleCreateReply}
				handleClearRepliedComment={() => setRepliedComment(null)}
			/>
		</div>
	);
};

export default Comments;
