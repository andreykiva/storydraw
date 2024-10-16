import { User } from 'src/users/entities/user.entity';
import { Follow } from './entities/follow.entity';
import { PaginationInput } from 'src/common/dto/pagination.dto';

/**
 * Interface for managing user follow relationships.
 *
 * Provides methods for creating, removing, and querying follow relationships
 * between users. This interface supports pagination and count retrieval
 * for followers and following users.
 */
export interface FollowsServiceInterface {
	/**
	 * Creates a new follow relationship.
	 *
	 * @param followingUserId - The ID of the user to be followed.
	 * @param follower - The user who is following.
	 * @returns A promise that resolves to the created Follow entity.
	 */
	create(followingUserId: string, follower: User): Promise<Follow>;

	/**
	 * Removes a follow relationship.
	 *
	 * @param unfollowingUserId - The ID of the user to unfollow.
	 * @param unfollower - The user who is unfollowing.
	 * @returns A promise that resolves to the removed Follow entity or true if no relationship existed.
	 */
	remove(unfollowingUserId: string, unfollower: User): Promise<Follow | boolean>;

	/**
	 * Retrieves a list of followers for a given user.
	 *
	 * @param userId - The ID of the user for whom to retrieve followers.
	 * @param paginationInput - The pagination parameters.
	 * @returns A promise that resolves to an array of Follow entities.
	 */
	getFollowers(userId: string, paginationInput: PaginationInput): Promise<Follow[]>;

	/**
	 * Retrieves a list of users that a given user is following.
	 *
	 * @param userId - The ID of the user for whom to retrieve following users.
	 * @param paginationInput - The pagination parameters.
	 * @returns A promise that resolves to an array of Follow entities.
	 */
	getFollowing(userId: string, paginationInput: PaginationInput): Promise<Follow[]>;

	/**
	 * Retrieves a list of friends (mutual follows) for a given user.
	 *
	 * @param userId - The ID of the user for whom to retrieve friends.
	 * @param paginationInput - The pagination parameters.
	 * @returns A promise that resolves to an array of Follow entities.
	 */
	getFriends(userId: string, paginationInput: PaginationInput): Promise<Follow[]>;

	/**
	 * Retrieves the count of followers for a given user.
	 *
	 * @param userId - The ID of the user for whom to retrieve the follower count.
	 * @returns A promise that resolves to the number of followers.
	 */
	getFollowersCount(userId: string): Promise<number>;

	/**
	 * Retrieves the count of users that a given user is following.
	 *
	 * @param userId - The ID of the user for whom to retrieve the following count.
	 * @returns A promise that resolves to the number of users being followed.
	 */
	getFollowingCount(userId: string): Promise<number>;

	/**
	 * Retrieves the count of friends (mutual follows) for a given user.
	 *
	 * @param userId - The ID of the user for whom to retrieve the friends count.
	 * @returns A promise that resolves to the number of friends.
	 */
	getFriendsCount(userId: string): Promise<number>;

	/**
	 * Checks if a user is following another user.
	 *
	 * @param followerId - The ID of the follower.
	 * @param followingUserId - The ID of the user being followed.
	 * @returns A promise that resolves to true if the follower is following the user, otherwise false.
	 */
	hasFollowed(followerId: string, followingUserId: string): Promise<boolean>;

	/**
	 * Finds a follow relationship by follower and following user IDs.
	 *
	 * @param followerId - The ID of the follower.
	 * @param followingUserId - The ID of the user being followed.
	 * @returns A promise that resolves to the Follow entity if found, otherwise null.
	 */
	findOneByFollowerAndFollowing(followerId: string, followingUserId: string): Promise<Follow | null>;
}
