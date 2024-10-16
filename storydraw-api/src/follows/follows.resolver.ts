import { Resolver, Args, Query, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Follow } from './entities/follow.entity';
import { FollowsService } from './services/follows.service';
import { FollowInput } from './dto/follow.input';
import { FollowsCountResponse } from './dto/follows-count-response';
import { UnfollowResponse } from './dto/unfollow-response';
import { PaginationInput } from 'src/common/dto/pagination.dto';

/**
 * FollowsResolver - Resolver for managing user follow relationships.
 *
 * Provides mutations for following and unfollowing users,
 * as well as queries for retrieving followers, following users,
 * and counts of followers and following relationships.
 */
@Resolver(() => Follow)
export class FollowsResolver {
	constructor(private readonly followsService: FollowsService) {}

	/**
	 * Follow a user.
	 * @param context - The request context containing the authenticated user.
	 * @param followInput - The input data containing the user ID to follow.
	 * @returns The Follow entity representing the new following relationship.
	 */
	@Mutation(() => Follow)
	@UseGuards(JwtAuthGuard)
	async follow(@Context() context, @Args('followInput') followInput: FollowInput) {
		const user = context.req.user;
		return this.followsService.create(followInput.userId, user);
	}

	/**
	 * Unfollow a user.
	 * @param context - The request context containing the authenticated user.
	 * @param unfollowInput - The input data containing the user ID to unfollow.
	 * @returns A response indicating success or failure of the unfollow operation.
	 */
	@Mutation(() => UnfollowResponse)
	@UseGuards(JwtAuthGuard)
	async unfollow(@Context() context, @Args('unfollowInput') unfollowInput: FollowInput) {
		const user = context.req.user;
		await this.followsService.remove(unfollowInput.userId, user);
		return { success: true };
	}

	/**
	 * Retrieve a list of followers for a specific user.
	 * @param getFollowersInput - The input data containing the user ID to get followers for.
	 * @param paginationInput - Optional pagination parameters to limit results.
	 * @returns A list of Follow entities representing the user's followers.
	 */
	@Query(() => [Follow])
	async getFollowers(
		@Args('getFollowersInput') getFollowersInput: FollowInput,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.followsService.getFollowers(getFollowersInput.userId, { limit, cursor });
	}

	/**
	 * Retrieve a list of users that the specified user is following.
	 * @param getFollowingInput - The input data containing the user ID to get following users for.
	 * @param paginationInput - Optional pagination parameters to limit results.
	 * @returns A list of Follow entities representing the users the specified user is following.
	 */
	@Query(() => [Follow])
	async getFollowing(
		@Args('getFollowingInput') getFollowingInput: FollowInput,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.followsService.getFollowing(getFollowingInput.userId, { limit, cursor });
	}

	/**
	 * Retrieve a list of friends for the authenticated user.
	 * @param context - The request context containing the authenticated user.
	 * @param paginationInput - Optional pagination parameters to limit results.
	 * @returns A list of Follow entities representing the authenticated user's friends.
	 */
	@Query(() => [Follow])
	@UseGuards(JwtAuthGuard)
	async getFriends(
		@Context() context,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const userId = context.req.user.id;
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.followsService.getFriends(userId, { limit, cursor });
	}

	/**
	 * Get the count of followers for a specific user.
	 * @param getFollowersCountInput - The input data containing the user ID to get follower count for.
	 * @returns The number of followers for the specified user.
	 */
	@Query(() => FollowsCountResponse)
	async getFollowersCount(@Args('getFollowersCountInput') getFollowersCountInput: FollowInput) {
		const count = await this.followsService.getFollowersCount(getFollowersCountInput.userId);
		return { count };
	}

	/**
	 * Get the count of users that a specific user is following.
	 * @param getFollowingCountInput - The input data containing the user ID to get following count for.
	 * @returns The number of users the specified user is following.
	 */
	@Query(() => FollowsCountResponse)
	async getFollowingCount(@Args('getFollowingCountInput') getFollowingCountInput: FollowInput) {
		const count = await this.followsService.getFollowingCount(getFollowingCountInput.userId);
		return { count };
	}
}
