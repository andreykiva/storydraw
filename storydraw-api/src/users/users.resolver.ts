import { Resolver, Query, Args, Mutation, Context, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FindOneByUsernameInput } from './dto/find-user.input';
import { UpdateUserInput, UpdateUsernameInput } from './dto/update-user.input';
import { CheckUserExistsResponse } from './dto/user-response';
import { FollowsService } from 'src/follows/services/follows.service';
import { LikesService } from 'src/likes/services/likes.service';

@Resolver(() => User)
export class UsersResolver {
	constructor(
		private readonly usersService: UsersService,
		private readonly followsService: FollowsService,
		private readonly likesService: LikesService,
	) {}

	@Query(() => User, { nullable: true })
	findOneByUsername(@Args('usernameInput') usernameInput: FindOneByUsernameInput) {
		return this.usersService.findOneByUsername(usernameInput.username);
	}

	@ResolveField(() => Number)
	async followingCount(@Parent() user: User) {
		return this.followsService.getFollowingCount(user.id);
	}

	@ResolveField(() => Number)
	async followersCount(@Parent() user: User) {
		return this.followsService.getFollowersCount(user.id);
	}

	@ResolveField(() => Number)
	@UseGuards(JwtAuthGuard)
	async friendsCount(@Context() context) {
		const userId = context.req.user.id;
		return this.followsService.getFriendsCount(userId);
	}

	@ResolveField(() => Number)
	async likesCount(@Parent() user: User) {
		return this.likesService.getUserLikesCount(user.id);
	}

	@ResolveField(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async isFollowedBy(@Parent() user: User, @Context() context) {
		const userId = context.req.user.id;
		return this.followsService.hasFollowed(user.id, userId);
	}

	@ResolveField(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async isFollowing(@Parent() user: User, @Context() context) {
		const userId = context.req.user.id;
		return this.followsService.hasFollowed(userId, user.id);
	}

	@Mutation(() => User)
	@UseGuards(JwtAuthGuard)
	async updateUser(@Context() context, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
		const user = context.req.user;
		return this.usersService.updateUser(user, updateUserInput);
	}

	@Mutation(() => User)
	@UseGuards(JwtAuthGuard)
	async updateUsername(@Context() context, @Args('usernameInput') usernameInput: UpdateUsernameInput) {
		const user = context.req.user;
		return this.usersService.updateUsername(user, usernameInput.username);
	}

	@Query(() => User)
	@UseGuards(JwtAuthGuard)
	getMe(@Context() context) {
		return context.req.user;
	}

	@Query(() => CheckUserExistsResponse)
	async ensureUsernameNotExists(@Args('usernameInput') usernameInput: FindOneByUsernameInput) {
		const exists = await this.usersService.ensureUsernameNotExists(usernameInput.username);
		return { exists };
	}
}
