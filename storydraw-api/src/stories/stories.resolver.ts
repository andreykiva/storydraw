import { Resolver, Args, Mutation, Query, Context, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Story } from './entities/story.entity';
import { CreateStoryInput } from './dto/create-story.input';
import { GetStoryInput } from './dto/get-story.input';
import { LikesService } from 'src/likes/services/likes.service';
import { CommentsService } from 'src/comments/services/comments.service';
import { FavoritesService } from 'src/favorites/services/favorites.service';
import { SharesService } from 'src/shares/services/shares.service';
import { GetUserStoriesInput } from './dto/get-user-stories.input';
import { PaginationInput } from 'src/common/dto/pagination.dto';
import { StoriesService } from './services/stories.service';

/**
 * Resolver for managing story-related operations.
 *
 * This class handles queries and mutations related to stories,
 * including creating, retrieving, and aggregating data
 * such as likes, comments, favorites, and shares.
 */
@Resolver(() => Story)
export class StoriesResolver {
	constructor(
		private readonly storiesService: StoriesService,
		private readonly likesService: LikesService,
		private readonly commentsService: CommentsService,
		private readonly favoritesService: FavoritesService,
		private readonly sharesService: SharesService,
	) {}

	/**
	 * Creates a new story.
	 * @param context - The GraphQL context, which contains the user information.
	 * @param createStoryInput - The input data for creating a story.
	 * @returns The newly created story.
	 */
	@Mutation(() => Story)
	@UseGuards(JwtAuthGuard)
	async createStory(@Context() context, @Args('createStoryInput') createStoryInput: CreateStoryInput) {
		const user = context.req.user;
		return this.storiesService.create(createStoryInput, user);
	}

	/**
	 * Retrieves a story by its ID.
	 * @param getStoryInput - The input containing the story ID.
	 * @returns The requested story or null if not found.
	 */
	@Query(() => Story, { nullable: true })
	async getStory(@Args('getStoryInput') getStoryInput: GetStoryInput) {
		return this.storiesService.findOneById(getStoryInput.storyId);
	}

	/**
	 * Retrieves all stories with optional pagination.
	 * @param paginationInput - The pagination input.
	 * @returns An array of stories.
	 */
	@Query(() => [Story])
	async getAllStories(@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput) {
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.storiesService.findAll({ limit, cursor });
	}

	/**
	 * Retrieves stories created by a specific user.
	 * @param getUserStoriesInput - The input containing the user ID.
	 * @param paginationInput - The pagination input.
	 * @returns An array of stories created by the user.
	 */
	@Query(() => [Story])
	async getUserStories(
		@Args('getUserStoriesInput') getUserStoriesInput: GetUserStoriesInput,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.storiesService.findAllByUserId(getUserStoriesInput.userId, { limit, cursor });
	}

	/**
	 * Retrieves the count of likes for a specific story.
	 * @param story - The parent story entity.
	 * @returns The number of likes for the story.
	 */
	@ResolveField(() => Number)
	async likesCount(@Parent() story: Story) {
		return this.likesService.getStoryLikesCount(story.id);
	}

	/**
	 * Retrieves the count of comments for a specific story.
	 * @param story - The parent story entity.
	 * @returns The number of comments for the story.
	 */
	@ResolveField(() => Number)
	async commentsCount(@Parent() story: Story) {
		return this.commentsService.getCommentsCount(story.id);
	}

	/**
	 * Retrieves the count of favorites for a specific story.
	 * @param story - The parent story entity.
	 * @returns The number of favorites for the story.
	 */
	@ResolveField(() => Number)
	async favoritesCount(@Parent() story: Story) {
		return this.favoritesService.getFavoritesCount(story.id);
	}

	/**
	 * Retrieves the count of shares for a specific story.
	 * @param story - The parent story entity.
	 * @returns The number of shares for the story.
	 */
	@ResolveField(() => Number)
	async sharesCount(@Parent() story: Story) {
		return this.sharesService.getSharesCount(story.id);
	}

	/**
	 * Retrieves the user who created the story.
	 * @param story - The parent story entity.
	 * @returns The user who created the story.
	 */
	@ResolveField()
	async user(@Parent() story: Story) {
		return this.storiesService.getStoryAuthor(story.id);
	}

	/**
	 * Checks if the current user has liked the story.
	 * @param story - The parent story entity.
	 * @param context - The GraphQL context, which contains the user information.
	 * @returns True if the user has liked the story, otherwise false.
	 */
	@ResolveField(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async isLiked(@Parent() story: Story, @Context() context) {
		const userId = context.req.user.id;
		return this.likesService.hasStoryLiked(story.id, userId);
	}

	/**
	 * Checks if the current user has favorited the story.
	 * @param story - The parent story entity.
	 * @param context - The GraphQL context, which contains the user information.
	 * @returns True if the user has favorited the story, otherwise false.
	 */
	@ResolveField(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async isFavorited(@Parent() story: Story, @Context() context) {
		const userId = context.req.user.id;
		return this.favoritesService.hasFavorited(story.id, userId);
	}

	/**
	 * Checks if the current user has shared the story.
	 * @param story - The parent story entity.
	 * @param context - The GraphQL context, which contains the user information.
	 * @returns True if the user has shared the story, otherwise false.
	 */
	@ResolveField(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async isShared(@Parent() story: Story, @Context() context) {
		const userId = context.req.user.id;
		return this.sharesService.hasShared(story.id, userId);
	}
}
