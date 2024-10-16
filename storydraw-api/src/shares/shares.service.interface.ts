import { User } from 'src/users/entities/user.entity';
import { Share } from './entities/share.entity';

/**
 * SharesServiceInterface - Interface for managing shares.
 *
 * Describes methods for creating, retrieving, and checking shares
 * associated with stories.
 */
export interface SharesServiceInterface {
	/**
	 * Creates a new share entry for the specified story and user.
	 *
	 * @param storyId - The ID of the story to be shared.
	 * @param user - The user sharing the story.
	 * @returns A Promise resolving to the newly created Share object.
	 */
	create(storyId: string, user: User): Promise<Share>;

	/**
	 * Retrieves the total number of shares for the specified story.
	 *
	 * @param storyId - The ID of the story for which the share count is retrieved.
	 * @returns A Promise resolving to the number of shares for the story.
	 */
	getSharesCount(storyId: string): Promise<number>;

	/**
	 * Checks if the specified user has shared the given story.
	 *
	 * @param storyId - The ID of the story to check.
	 * @param userId - The ID of the user to check for.
	 * @returns A Promise resolving to a boolean indicating whether the user has shared the story.
	 */
	hasShared(storyId: string, userId: string): Promise<boolean>;

	/**
	 * Finds the share entry associated with the specified story ID and user ID.
	 *
	 * @param storyId - The ID of the story to check for shares.
	 * @param userId - The ID of the user whose share entry is to be retrieved.
	 * @returns A Promise resolving to the found Share object or null if not found.
	 */
	findOneByStoryIdAndUserId(storyId: string, userId: string): Promise<Share | null>;
}
