import { User } from 'src/users/entities/user.entity';
import { CreateCommentInput, CreateReplyInput } from './dto/create-comment.input';
import { Comment } from './entities/comment.entity';
import { PaginationInput } from 'src/common/dto/pagination.dto';
import { Story } from 'src/stories/entities/story.entity';

/**
 * CommentsServiceInterface - Interface for the comments service.
 *
 * Describes methods for creating, retrieving, counting, and removing comments,
 * as well as managing replies and interactions with stories.
 */
export interface CommentsServiceInterface {
	/**
	 * Creates a new comment.
	 *
	 * @param createCommentInput - DTO containing data for creating a comment.
	 * @param user - The user creating the comment.
	 * @returns A Promise that resolves to the created Comment object.
	 */
	createComment(createCommentInput: CreateCommentInput, user: User): Promise<Comment>;

	/**
	 * Creates a new reply to a comment.
	 *
	 * @param createReplyInput - DTO containing data for creating a reply.
	 * @param user - The user creating the reply.
	 * @returns A Promise that resolves to the created Comment object.
	 */
	createReply(createReplyInput: CreateReplyInput, user: User): Promise<Comment>;

	/**
	 * Removes a comment.
	 *
	 * @param commentId - ID of the comment to remove.
	 * @param userId - ID of the user attempting to remove the comment.
	 * @returns A Promise that resolves to the removed Comment object.
	 */
	remove(commentId: string, userId: string): Promise<Comment>;

	/**
	 * Gets the count of comments for a story.
	 *
	 * @param storyId - ID of the story to count comments for.
	 * @returns A Promise that resolves to the number of comments.
	 */
	getCommentsCount(storyId: string): Promise<number>;

	/**
	 * Gets the count of replies to a comment.
	 *
	 * @param commentId - ID of the comment to count replies for.
	 * @returns A Promise that resolves to the number of replies.
	 */
	getRepliesCount(commentId: string): Promise<number>;

	/**
	 * Retrieves comments for a story with pagination.
	 *
	 * @param storyId - ID of the story to retrieve comments for.
	 * @param paginationInput - Pagination data.
	 * @returns A Promise that resolves to an array of Comment objects.
	 */
	getComments(storyId: string, paginationInput: PaginationInput): Promise<Comment[]>;

	/**
	 * Retrieves replies to a comment with pagination.
	 *
	 * @param commentId - ID of the comment to retrieve replies for.
	 * @param paginationInput - Pagination data.
	 * @returns A Promise that resolves to an array of Comment objects.
	 */
	getReplies(commentId: string, paginationInput: PaginationInput): Promise<Comment[]>;

	/**
	 * Gets the author of a comment.
	 *
	 * @param commentId - ID of the comment to get the author of.
	 * @returns A Promise that resolves to the User who authored the comment.
	 */
	getCommentAuthor(commentId: string): Promise<User>;

	/**
	 * Gets the parent comment of a given comment.
	 *
	 * @param commentId - ID of the comment to find the parent of.
	 * @returns A Promise that resolves to the parent Comment object.
	 */
	getParentComment(commentId: string): Promise<Comment>;

	/**
	 * Gets the parent reply of a given comment.
	 *
	 * @param commentId - ID of the comment to find the parent reply of.
	 * @returns A Promise that resolves to the parent Comment object.
	 */
	getParenReply(commentId: string): Promise<Comment>;

	/**
	 * Gets the story associated with a comment.
	 *
	 * @param commentId - ID of the comment to find the associated story of.
	 * @returns A Promise that resolves to the Story object.
	 */
	getCommentStory(commentId: string): Promise<Story>;

	/**
	 * Finds a comment by its ID.
	 *
	 * @param id - ID of the comment to find.
	 * @returns A Promise that resolves to the Comment object or null if not found.
	 */
	findOneById(id: string): Promise<Comment | null>;
}
