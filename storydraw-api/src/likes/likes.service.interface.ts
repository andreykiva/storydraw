import { User } from 'src/users/entities/user.entity';
import { Like } from './entities/like.entity';
import { PaginationInput } from 'src/common/dto/pagination.dto';
import { Story } from 'src/stories/entities/story.entity';
import { Comment } from 'src/comments/entities/comment.entity';

/**
 * Interface for the Likes Service, defining methods for managing likes on stories and comments.
 */
export interface LikesServiceInterface {
	/**
	 * Creates a like for a story by a user.
	 * @param storyId - The ID of the story to be liked.
	 * @param user - The user who is liking the story.
	 * @returns The created Like object.
	 */
	createStoryLike(storyId: string, user: User): Promise<Like>;

	/**
	 * Creates a like for a comment by a user.
	 * @param commentId - The ID of the comment to be liked.
	 * @param user - The user who is liking the comment.
	 * @returns The created Like object.
	 */
	createCommentLike(commentId: string, user: User): Promise<Like>;

	/**
	 * Removes a like from a story by a user.
	 * @param storyId - The ID of the story from which to remove the like.
	 * @param userId - The ID of the user who is removing the like.
	 * @returns The removed Like object or true if no like was found.
	 */
	removeStoryLike(storyId: string, userId: string): Promise<Like | boolean>;

	/**
	 * Removes a like from a comment by a user.
	 * @param commentId - The ID of the comment from which to remove the like.
	 * @param userId - The ID of the user who is removing the like.
	 * @returns The removed Like object or true if no like was found.
	 */
	removeCommentLike(commentId: string, userId: string): Promise<Like | boolean>;

	/**
	 * Finds a like for a story by a specific user.
	 * @param storyId - The ID of the story.
	 * @param userId - The ID of the user.
	 * @returns The found Like object or null if not found.
	 */
	findStoryLike(storyId: string, userId: string): Promise<Like | null>;

	/**
	 * Finds a like for a comment by a specific user.
	 * @param commentId - The ID of the comment.
	 * @param userId - The ID of the user.
	 * @returns The found Like object or null if not found.
	 */
	findCommentLike(commentId: string, userId: string): Promise<Like | null>;

	/**
	 * Gets the count of likes for a specific story.
	 * @param storyId - The ID of the story.
	 * @returns The count of likes for the story.
	 */
	getStoryLikesCount(storyId: string): Promise<number>;

	/**
	 * Gets the count of likes for a specific comment.
	 * @param commentId - The ID of the comment.
	 * @returns The count of likes for the comment.
	 */
	getCommentLikesCount(commentId: string): Promise<number>;

	/**
	 * Gets the total count of likes by a user.
	 * @param userId - The ID of the user.
	 * @returns The count of likes made by the user.
	 */
	getUserLikesCount(userId: string): Promise<number>;

	/**
	 * Checks if a user has liked a specific story.
	 * @param storyId - The ID of the story.
	 * @param userId - The ID of the user.
	 * @returns True if the user has liked the story, otherwise false.
	 */
	hasStoryLiked(storyId: string, userId: string): Promise<boolean>;

	/**
	 * Checks if a user has liked a specific comment.
	 * @param commentId - The ID of the comment.
	 * @param userId - The ID of the user.
	 * @returns True if the user has liked the comment, otherwise false.
	 */
	hasCommentLiked(commentId: string, userId: string): Promise<boolean>;

	/**
	 * Retrieves all story likes made by a user with pagination.
	 * @param userId - The ID of the user.
	 * @param paginationInput - The pagination input to use.
	 * @returns A list of likes made by the user on stories.
	 */
	getUserStoryLikes(userId: string, paginationInput: PaginationInput): Promise<Like[]>;

	/**
	 * Retrieves the story associated with a specific like.
	 * @param likeId - The ID of the like.
	 * @returns The liked Story object.
	 */
	getLikedStory(likeId: string): Promise<Story>;

	/**
	 * Retrieves the comment associated with a specific like.
	 * @param likeId - The ID of the like.
	 * @returns The liked Comment object.
	 */
	getLikedComment(likeId: string): Promise<Comment>;

	/**
	 * Retrieves the user who made a specific like.
	 * @param likeId - The ID of the like.
	 * @returns The User who made the like.
	 */
	getLikeUser(likeId: string): Promise<User>;
}
