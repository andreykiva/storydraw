import { User } from 'src/users/entities/user.entity';
import { Favorite } from './entities/favorite.entity';
import { PaginationInput } from 'src/common/dto/pagination.dto';

/**
 * FavoritesServiceInterface - Interface for managing user favorites for stories.
 *
 * Describes methods for creating, removing, and retrieving favorites
 * associated with user accounts, including checking if a user has favorited a story.
 */
export interface FavoritesServiceInterface {
	/**
	 * Adds a story to the user's favorites.
	 *
	 * @param storyId - The ID of the story to favorite.
	 * @param user - The user who is adding the favorite.
	 * @returns A Promise resolving to the created Favorite object.
	 */
	create(storyId: string, user: User): Promise<Favorite>;

	/**
	 * Removes a story from the user's favorites.
	 *
	 * @param storyId - The ID of the story to remove from favorites.
	 * @param userId - The ID of the user removing the favorite.
	 * @returns A Promise resolving to the removed Favorite object.
	 */
	remove(storyId: string, userId: string): Promise<Favorite>;

	/**
	 * Retrieves all favorites for a specified user with pagination.
	 *
	 * @param userId - The ID of the user whose favorites are to be retrieved.
	 * @param paginationInput - Pagination parameters to limit results.
	 * @returns A Promise resolving to an array of Favorite objects.
	 */
	findAllByUserId(userId: string, paginationInput: PaginationInput): Promise<Favorite[]>;

	/**
	 * Retrieves the count of favorites for a specific story.
	 *
	 * @param storyId - The ID of the story for which to count favorites.
	 * @returns A Promise resolving to the count of favorites.
	 */
	getFavoritesCount(storyId: string): Promise<number>;

	/**
	 * Checks if a user has favorited a specific story.
	 *
	 * @param storyId - The ID of the story to check.
	 * @param userId - The ID of the user to check.
	 * @returns A Promise resolving to a boolean indicating if the story is favorited.
	 */
	hasFavorited(storyId: string, userId: string): Promise<boolean>;

	/**
	 * Finds a favorite by story ID and user ID.
	 *
	 * @param storyId - The ID of the story.
	 * @param userId - The ID of the user.
	 * @returns A Promise resolving to the Favorite object or null if not found.
	 */
	findOneByStoryIdAndUserId(storyId: string, userId: string): Promise<Favorite | null>;
}
