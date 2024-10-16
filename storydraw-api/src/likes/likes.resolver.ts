import { Resolver, Args, Mutation, Context, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Like } from './entities/like.entity';
import { LikesService } from './services/likes.service';
import { LikeCommentInput, LikeStoryInput } from './dto/like.input';
import { LikesCountResponse } from './dto/likes-count-response';
import { UnlikeResponse } from './dto/unlike-response';
import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { GetUserStoryLikesInput } from './dto/get-user-story-likes.input';
import { PaginationInput } from 'src/common/dto/pagination.dto';

/**
 * Resolver for managing likes on stories and comments.
 */
@Resolver(() => Like)
export class LikesResolver {
	constructor(private readonly likesService: LikesService) {}

	/**
	 * Allows a user to like a story.
	 * @param context - The context containing the authenticated user.
	 * @param likeStoryInput - Input data for liking a story.
	 * @returns The created Like object.
	 */
	@Mutation(() => Like)
	@UseGuards(JwtAuthGuard)
	async likeStory(@Context() context, @Args('likeStoryInput') likeStoryInput: LikeStoryInput) {
		const user = context.req.user;
		return this.likesService.createStoryLike(likeStoryInput.storyId, user);
	}

	/**
	 * Allows a user to like a comment.
	 * @param context - The context containing the authenticated user.
	 * @param likeCommentInput - Input data for liking a comment.
	 * @returns The created Like object.
	 */
	@Mutation(() => Like)
	@UseGuards(JwtAuthGuard)
	async likeComment(@Context() context, @Args('likeCommentInput') likeCommentInput: LikeCommentInput) {
		const user = context.req.user;
		return this.likesService.createCommentLike(likeCommentInput.commentId, user);
	}

	/**
	 * Allows a user to unlike a story.
	 * @param context - The context containing the authenticated user.
	 * @param unlikeStoryInput - Input data for unliking a story.
	 * @returns A response indicating success.
	 */
	@Mutation(() => UnlikeResponse)
	@UseGuards(JwtAuthGuard)
	async unlikeStory(@Context() context, @Args('unlikeStoryInput') unlikeStoryInput: LikeStoryInput) {
		const userId = context.req.user.id;
		await this.likesService.removeStoryLike(unlikeStoryInput.storyId, userId);
		return { success: true };
	}

	/**
	 * Allows a user to unlike a comment.
	 * @param context - The context containing the authenticated user.
	 * @param unlikeCommentInput - Input data for unliking a comment.
	 * @returns A response indicating success.
	 */
	@Mutation(() => UnlikeResponse)
	@UseGuards(JwtAuthGuard)
	async unlikeComment(@Context() context, @Args('unlikeCommentInput') unlikeCommentInput: LikeCommentInput) {
		const userId = context.req.user.id;
		await this.likesService.removeCommentLike(unlikeCommentInput.commentId, userId);
		return { success: true };
	}

	/**
	 * Retrieves likes for a user's stories with optional pagination.
	 * @param getUserStoryLikesInput - Input for fetching user story likes.
	 * @param paginationInput - Optional pagination input.
	 * @returns A list of likes for the user's stories.
	 */
	@Query(() => [Like])
	async getUserStoryLikes(
		@Args('getUserStoryLikesInput') getUserStoryLikesInput: GetUserStoryLikesInput,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.likesService.getUserStoryLikes(getUserStoryLikesInput.userId, { limit, cursor });
	}

	/**
	 * Retrieves the count of likes for a specific story.
	 * @param likesCountInput - Input for fetching likes count for a story.
	 * @returns The count of likes for the story.
	 */
	@Query(() => LikesCountResponse)
	@UseGuards(JwtAuthGuard)
	async getStoryLikesCount(@Args('likesCountInput') likesCountInput: LikeStoryInput) {
		const count = await this.likesService.getStoryLikesCount(likesCountInput.storyId);
		return { count };
	}

	/**
	 * Retrieves the count of likes for a specific comment.
	 * @param likesCountInput - Input for fetching likes count for a comment.
	 * @returns The count of likes for the comment.
	 */
	@Query(() => LikesCountResponse)
	@UseGuards(JwtAuthGuard)
	async getCommentLikesCount(@Args('likesCountInput') likesCountInput: LikeCommentInput) {
		const count = await this.likesService.getCommentLikesCount(likesCountInput.commentId);
		return { count };
	}

	/**
	 * Resolves the story associated with the like.
	 * @param like - The like entity.
	 * @returns The story object related to the like.
	 */
	@ResolveField(() => Story, { nullable: true })
	async story(@Parent() like: Like) {
		return this.likesService.getLikedStory(like.id);
	}

	/**
	 * Resolves the user who created the like.
	 * @param like - The like entity.
	 * @returns The user object who liked.
	 */
	@ResolveField(() => User)
	async user(@Parent() like: Like) {
		return this.likesService.getLikeUser(like.id);
	}

	/**
	 * Resolves the comment associated with the like.
	 * @param like - The like entity.
	 * @returns The comment object related to the like.
	 */
	@ResolveField(() => Comment, { nullable: true })
	async comment(@Parent() like: Like) {
		return this.likesService.getLikedComment(like.id);
	}
}
