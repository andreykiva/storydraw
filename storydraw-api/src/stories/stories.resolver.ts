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
import { GetUserStoriesInput } from './dto/get-user-stories.input';
import { PaginationInput } from 'src/common/dto/pagination.dto';

@Resolver(() => Story)
export class StoriesResolver {
	constructor(
		private readonly storiesService: StoriesService,
		private readonly likesService: LikesService,
		private readonly commentsService: CommentsService,
		private readonly favoritesService: FavoritesService,
		private readonly sharesService: SharesService,
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
	async getAllStories(@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput) {
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.storiesService.findAll({ limit, cursor });
	}

	@Query(() => [Story])
	async getUserStories(
		@Args('getUserStoriesInput') getUserStoriesInput: GetUserStoriesInput,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.storiesService.getUserStories(getUserStoriesInput.userId, { limit, cursor });
	}

	@Query(() => [Story])
	async getFavoriteStories(
		@Args('getFavoriteStoriesInput') getFavoriteStoriesInput: GetUserStoriesInput,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.storiesService.getFavoriteStories(getFavoriteStoriesInput.userId, { limit, cursor });
	}

	@Query(() => [Story])
	async getLikedStories(
		@Args('getLikedStoriesInput') getLikedStoriesInput: GetUserStoriesInput,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.storiesService.getLikedStories(getLikedStoriesInput.userId, { limit, cursor });
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
}
