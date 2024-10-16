import styles from './Comments.module.scss';
import CommentSection from './CommentSection/CommentSection';
import useComments from '@/hooks/interaction/useComments';
import CreateComment from './CreateComment/CreateComment';
import CommentsPlaceholder from './CommentsPlaceholder/CommentsPlaceholder';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '@/components/ui/Loader/Loader';
import { COMMENTS_LIMIT } from '@/constants/pagination';
import commentIcon from '@/assets/icons/comments/comment.svg';

type CommentsProps = {
	storyId: string;
	isAuth: boolean;
	currentUserId: string;
};

const Comments = ({ storyId, isAuth, currentUserId }: CommentsProps) => {
	const {
		comments,
		error,
		isLoaded,
		repliedComment,
		handleLikeComment,
		handleLikeReply,
		handleUnlikeComment,
		handleUnlikeReply,
		handleRemoveComment,
		handleRemoveReply,
		addReplies,
		handleCreateComment,
		handleCreateReply,
		setRepliedComment,
		handleChangeCursor,
		hasMore,
	} = useComments({ storyId, isAuth });

	if (error) {
		return <div>Error... {error.graphQLErrors[0]?.message}</div>;
	}

	if (!isLoaded) return <CommentsPlaceholder length={COMMENTS_LIMIT} />;

	return (
		<div className={styles.CommentsPanel}>
			<div className={styles.Comments} id="commentsContainer">
				{comments.length ? (
					<InfiniteScroll
						dataLength={comments.length || 0}
						next={handleChangeCursor}
						hasMore={hasMore}
						loader={<Loader className={styles.Loader} />}
						scrollableTarget="commentsContainer"
						style={{ overflow: 'hidden' }}
					>
						{comments.map((comment) => (
							<CommentSection
								key={comment.id}
								comment={comment}
								isAuth={isAuth}
								currentUserId={currentUserId}
								handleLikeComment={handleLikeComment}
								handleLikeReply={handleLikeReply}
								handleUnlikeComment={handleUnlikeComment}
								handleUnlikeReply={handleUnlikeReply}
								handleRemoveComment={handleRemoveComment}
								handleRemoveReply={handleRemoveReply}
								addReplies={addReplies}
								setRepliedComment={setRepliedComment}
							/>
						))}
					</InfiniteScroll>
				) : (
					<div className={styles.NoComments}>
						<img src={commentIcon} alt="Not comments" className={styles.NoCommentsIcon} />
						<span className={styles.NoCommentsText}>Be the first to comment!</span>
					</div>
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
