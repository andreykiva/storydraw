import { User } from 'src/users/entities/user.entity';
import { UserMetadata } from './entities/user-metadata.entity';

/**
 * UserMetadataServiceInterface - Interface for managing user metadata.
 *
 * Describes methods for creating, retrieving, and updating metadata
 * associated with user accounts.
 */
export interface UserMetadataServiceInterface {
	/**
	 * Creates a new metadata entry for the specified user.
	 *
	 * @param user - The user for whom the metadata is created.
	 * @returns A Promise resolving to the newly created UserMetadata object.
	 */
	create(user: User): Promise<UserMetadata>;

	/**
	 * Finds the metadata entry associated with the specified user ID.
	 *
	 * @param userId - The ID of the user whose metadata is to be retrieved.
	 * @returns A Promise resolving to the found UserMetadata object or null if not found.
	 */
	findOneByUserId(userId: string): Promise<UserMetadata | null>;

	/**
	 * Updates the last notifications viewed timestamp for the specified user ID.
	 *
	 * @param userId - The ID of the user whose metadata is to be updated.
	 * @returns A Promise resolving to the updated UserMetadata object.
	 */
	updateLastNotificationsViewed(userId: string): Promise<UserMetadata>;
}
