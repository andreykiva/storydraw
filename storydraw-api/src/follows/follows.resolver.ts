import { Resolver, Args, Query, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Follow } from './entities/follow.entity';
import { FollowsService } from './services/follows.service';
import { FollowInput } from './dto/follow.input';
import { FollowsCountResponse } from './dto/follows-count-response';
import { UnfollowResponse } from './dto/unfollow-response';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Follow)
export class FollowsResolver {
	constructor(private readonly followsService: FollowsService) {}

	@Mutation(() => Follow)
	@UseGuards(JwtAuthGuard)
	async follow(@Context() context, @Args('followInput') followInput: FollowInput) {
		const user = context.req.user;
		return this.followsService.follow(followInput.userId, user);
	}

	@Mutation(() => UnfollowResponse)
	@UseGuards(JwtAuthGuard)
	async unfollow(@Context() context, @Args('unfollowInput') unfollowInput: FollowInput) {
		const user = context.req.user;
		await this.followsService.unfollow(unfollowInput.userId, user);
		return { success: true };
	}

	@Query(() => [User])
	async followers(@Args('followersInput') followersInput: FollowInput) {
		return this.followsService.getFollowers(followersInput.userId);
	}

	@Query(() => [User])
	async following(@Args('followingInput') followingInput: FollowInput) {
		return this.followsService.getFollowing(followingInput.userId);
	}

	@Query(() => [User])
	@UseGuards(JwtAuthGuard)
	async friends(@Context() context) {
		const userId = context.req.user.id;
		return this.followsService.getFriends(userId);
	}

	@Query(() => FollowsCountResponse)
	async followersCount(@Args('followersCountInput') followersCountInput: FollowInput) {
		const count = await this.followsService.getFollowersCount(followersCountInput.userId);
		return { count };
	}

	@Query(() => FollowsCountResponse)
	async followingCount(@Args('followingCountInput') followingCountInput: FollowInput) {
		const count = await this.followsService.getFollowingCount(followingCountInput.userId);
		return { count };
	}
}
