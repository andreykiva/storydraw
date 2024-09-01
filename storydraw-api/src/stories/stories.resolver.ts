import { Resolver, Args, Mutation, Query, Context, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Story } from './entities/story.entity';
import { StoriesService } from './services/stories.service';
import { CreateStoryInput } from './dto/create-story.input';
import { GetStoryInput } from './dto/get-story.input';
import { LikesService } from 'src/likes/services/likes.service';
import { CommentsService } from 'src/comments/services/comments.service';
import { FavoritesService } from 'src/favorites/services/favorites.service';
import { SharesService } from 'src/shares/services/shares.service';
import { FollowsService } from 'src/follows/services/follows.service';
import { GetUserStoriesInput } from './dto/get-user-stories.input';

@Resolver(() => Story)
export class StoriesResolver {
	constructor(
		private readonly storiesService: StoriesService,
		private readonly likesService: LikesService,
		private readonly commentsService: CommentsService,
		private readonly favoritesService: FavoritesService,
		private readonly sharesService: SharesService,
		private readonly followsService: FollowsService,
	) {}

	@Mutation(() => Story)
	@UseGuards(JwtAuthGuard)
	async createStory(@Context() context, @Args('createStoryInput') createStoryInput: CreateStoryInput) {
		const user = context.req.user;
		return this.storiesService.create(createStoryInput, user);
	}

	@Query(() => Story, { nullable: true })
	async getStory(@Args('getStoryInput') getStoryInput: GetStoryInput) {
		return this.storiesService.findOneById(getStoryInput.storyId);
	}

	@Query(() => [Story])
	async getAllStories() {
		return this.storiesService.findAll();
	}

	@Query(() => [Story])
	async getUserStories(@Args('getUserStoriesInput') getUserStoriesInput: GetUserStoriesInput) {
		return this.storiesService.getUserStories(getUserStoriesInput.userId);
	}

	@Query(() => [Story])
	async getFavoriteStories(@Args('getFavoriteStoriesInput') getFavoriteStoriesInput: GetUserStoriesInput) {
		return this.storiesService.getFavoriteStories(getFavoriteStoriesInput.userId);
	}

	@Query(() => [Story])
	async getLikedStories(@Args('getLikedStoriesInput') getLikedStoriesInput: GetUserStoriesInput) {
		return this.storiesService.getLikedStories(getLikedStoriesInput.userId);
	}

	@ResolveField(() => Number)
	async likesCount(@Parent() story: Story) {
		return this.likesService.getStoryLikesCount(story.id);
	}

	@ResolveField(() => Number)
	async commentsCount(@Parent() story: Story) {
		return this.commentsService.getCommentsCount(story.id);
	}

	@ResolveField(() => Number)
	async favoritesCount(@Parent() story: Story) {
		return this.favoritesService.getFavoritesCount(story.id);
	}

	@ResolveField(() => Number)
	async sharesCount(@Parent() story: Story) {
		return this.sharesService.getSharesCount(story.id);
	}

	@ResolveField()
	async user(@Parent() story: Story) {
		return this.storiesService.getStoryAuthor(story.id);
	}

	@ResolveField(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async isLiked(@Parent() story: Story, @Context() context) {
		const userId = context.req.user.id;
		return this.likesService.hasStoryLiked(story.id, userId);
	}

	@ResolveField(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async isFavorited(@Parent() story: Story, @Context() context) {
		const userId = context.req.user.id;
		return this.favoritesService.hasFavorited(story.id, userId);
	}

	@ResolveField(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async isShared(@Parent() story: Story, @Context() context) {
		const userId = context.req.user.id;
		return this.sharesService.hasShared(story.id, userId);
	}

	@ResolveField(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async isFollowedBy(@Parent() story: Story, @Context() context) {
		const userId = context.req.user.id;
		const author = await this.storiesService.getStoryAuthor(story.id);
		return this.followsService.hasFollowed(author.id, userId);
	}

	@ResolveField(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async isFollowing(@Parent() story: Story, @Context() context) {
		const userId = context.req.user.id;
		const author = await this.storiesService.getStoryAuthor(story.id);
		return this.followsService.hasFollowed(userId, author.id);
	}
}
