import { Resolver, Query, Args, Mutation, Context, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUserByUsernameInput } from './dto/get-user.input';
import { UpdateUserInput, UpdateUsernameInput } from './dto/update-user.input';
import { UserExistsResponse } from './dto/user-exists-response';
import { FollowsService } from 'src/follows/services/follows.service';
import { LikesService } from 'src/likes/services/likes.service';

/**
 * Resolver for user-related GraphQL queries and mutations.
 */
@Resolver(() => User)
export class UsersResolver {
	constructor(
		private readonly usersService: UsersService,
		private readonly followsService: FollowsService,
		private readonly likesService: LikesService,
	) {}

	/**
	 * Retrieves a user by their username.
	 *
	 * @param usernameInput - Input containing the username to search for.
	 * @returns The User object or null if not found.
	 */
	@Query(() => User, { nullable: true })
	async getUserByUsername(@Args('usernameInput') usernameInput: GetUserByUsernameInput) {
		return this.usersService.findOneByUsername(usernameInput.username);
	}

	/**
	 * Retrieves the current authenticated user.
	 *
	 * @param context - The request context containing user information.
	 * @returns The authenticated User object.
	 */
	@Query(() => User)
	@UseGuards(JwtAuthGuard)
	async getCurrentUser(@Context() context) {
		return context.req.user;
	}

	/**
	 * Resolves the count of users that the specified user is following.
	 *
	 * @param user - The parent user object.
	 * @returns The number of users that the user is following.
	 */
	@ResolveField(() => Number)
	async followingCount(@Parent() user: User) {
		return this.followsService.getFollowingCount(user.id);
	}

	/**
	 * Resolves the count of followers for the specified user.
	 *
	 * @param user - The parent user object.
	 * @returns The number of followers for the user.
	 */
	@ResolveField(() => Number)
	async followersCount(@Parent() user: User) {
		return this.followsService.getFollowersCount(user.id);
	}

	/**
	 * Resolves the count of friends for the current authenticated user.
	 *
	 * @param context - The request context containing user information.
	 * @returns The number of friends for the authenticated user.
	 */
	@ResolveField(() => Number)
	@UseGuards(JwtAuthGuard)
	async friendsCount(@Context() context) {
		const userId = context.req.user.id;
		return this.followsService.getFriendsCount(userId);
	}

	/**
	 * Resolves the count of likes for the specified user.
	 *
	 * @param user - The parent user object.
	 * @returns The number of likes for the user.
	 */
	@ResolveField(() => Number)
	async likesCount(@Parent() user: User) {
		return this.likesService.getUserLikesCount(user.id);
	}

	/**
	 * Checks if the current authenticated user is followed by the specified user.
	 *
	 * @param user - The parent user object.
	 * @param context - The request context containing user information.
	 * @returns True if the authenticated user is followed by the specified user, otherwise false.
	 */
	@ResolveField(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async isFollowedBy(@Parent() user: User, @Context() context) {
		const userId = context.req.user.id;
		return this.followsService.hasFollowed(user.id, userId);
	}

	/**
	 * Checks if the current authenticated user is following the specified user.
	 *
	 * @param user - The parent user object.
	 * @param context - The request context containing user information.
	 * @returns True if the authenticated user is following the specified user, otherwise false.
	 */
	@ResolveField(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async isFollowing(@Parent() user: User, @Context() context) {
		const userId = context.req.user.id;
		return this.followsService.hasFollowed(userId, user.id);
	}

	/**
	 * Updates the current authenticated user's details.
	 *
	 * @param context - The request context containing user information.
	 * @param updateUserInput - The data for updating the user.
	 * @returns The updated User object.
	 */
	@Mutation(() => User)
	@UseGuards(JwtAuthGuard)
	async updateUser(@Context() context, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
		const user = context.req.user;
		return this.usersService.update(user, updateUserInput);
	}

	/**
	 * Updates the username of the current authenticated user.
	 *
	 * @param context - The request context containing user information.
	 * @param usernameInput - The input containing the new username.
	 * @returns The updated User object.
	 */
	@Mutation(() => User)
	@UseGuards(JwtAuthGuard)
	async updateUsername(@Context() context, @Args('usernameInput') usernameInput: UpdateUsernameInput) {
		const user = context.req.user;
		return this.usersService.updateUsername(user, usernameInput.username);
	}

	/**
	 * Ensures the specified username does not already exist.
	 *
	 * @param usernameInput - Input containing the username to check.
	 * @returns An object indicating whether the username exists.
	 */
	@Query(() => UserExistsResponse)
	async ensureUsernameNotExists(@Args('usernameInput') usernameInput: GetUserByUsernameInput) {
		const exists = await this.usersService.ensureUsernameNotExists(usernameInput.username);
		return { exists };
	}
}
