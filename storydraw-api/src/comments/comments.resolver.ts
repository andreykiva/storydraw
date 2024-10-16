import { Resolver, Args, Mutation, Context, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCommentInput, CreateReplyInput } from './dto/create-comment.input';
import { CommentsService } from './services/comments.service';
import { RemoveCommentInput } from './dto/remove-comment.input';
import { GetCommentsCountInput } from './dto/get-comments-count.input';
import { GetCommentsInput, GetRepliesInput } from './dto/get-comments.input';
import { Comment } from './entities/comment.entity';
import { CommentsCountResponse } from './dto/comments-count-response';
import { LikesService } from 'src/likes/services/likes.service';
import { RemoveCommentResponse } from './dto/remove-comment-response';
import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/users/entities/user.entity';
import { PaginationInput } from 'src/common/dto/pagination.dto';
import { RepliesPaginationInput } from './dto/replies-pagination.input';

/**
 * Resolver for comment-related GraphQL queries and mutations.
 */
@Resolver(() => Comment)
export class CommentsResolver {
	constructor(
		private readonly commentsService: CommentsService,
		private readonly likesService: LikesService,
	) {}

	/**
	 * Retrieves comments for a specific story.
	 *
	 * @param getCommentsInput - Input containing the story ID to retrieve comments for.
	 * @param paginationInput - Optional pagination parameters (limit and cursor).
	 * @returns A list of Comment objects associated with the specified story.
	 */
	@Query(() => [Comment])
	async getComments(
		@Args('getCommentsInput') getCommentsInput: GetCommentsInput,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.commentsService.getComments(getCommentsInput.storyId, { limit, cursor });
	}

	/**
	 * Retrieves replies for a specific comment.
	 *
	 * @param getRepliesInput - Input containing the comment ID to retrieve replies for.
	 * @param paginationInput - Optional pagination parameters (limit and cursor).
	 * @returns A list of Comment objects that are replies to the specified comment.
	 */
	@Query(() => [Comment])
	async getReplies(
		@Args('getRepliesInput') getRepliesInput: GetRepliesInput,
		@Args('paginationInput', { nullable: true }) paginationInput?: RepliesPaginationInput,
	) {
		const { limit = 3, cursor = null } = paginationInput || {};
		return this.commentsService.getReplies(getRepliesInput.commentId, { limit, cursor });
	}

	/**
	 * Creates a new comment.
	 *
	 * @param context - The request context containing user information.
	 * @param createCommentInput - Input data for creating the new comment.
	 * @returns The newly created Comment object.
	 */
	@Mutation(() => Comment)
	@UseGuards(JwtAuthGuard)
	async createComment(@Context() context, @Args('createCommentInput') createCommentInput: CreateCommentInput) {
		const user = context.req.user;
		return this.commentsService.createComment(createCommentInput, user);
	}

	/**
	 * Creates a new reply to an existing comment.
	 *
	 * @param context - The request context containing user information.
	 * @param createReplyInput - Input data for creating the new reply.
	 * @returns The newly created Comment object that is a reply.
	 */
	@Mutation(() => Comment)
	@UseGuards(JwtAuthGuard)
	async createReply(@Context() context, @Args('createReplyInput') createReplyInput: CreateReplyInput) {
		const user = context.req.user;
		return this.commentsService.createReply(createReplyInput, user);
	}

	/**
	 * Removes a comment.
	 *
	 * @param context - The request context containing user information.
	 * @param removeCommentInput - Input data containing the comment ID to remove.
	 * @returns A response indicating the success of the operation.
	 */
	@Mutation(() => RemoveCommentResponse)
	@UseGuards(JwtAuthGuard)
	async removeComment(@Context() context, @Args('removeCommentInput') removeCommentInput: RemoveCommentInput) {
		const userId = context.req.user.id;
		await this.commentsService.remove(removeCommentInput.commentId, userId);
		return { success: true };
	}

	/**
	 * Retrieves the count of comments for a specific story.
	 *
	 * @param getCmmentsCountInput - Input containing the story ID to count comments for.
	 * @returns The count of comments for the specified story.
	 */
	@Query(() => CommentsCountResponse)
	async getCmmentsCount(@Args('getCmmentsCountInput') getCmmentsCountInput: GetCommentsCountInput) {
		const count = await this.commentsService.getCommentsCount(getCmmentsCountInput.storyId);
		return { count };
	}

	/**
	 * Resolves the count of likes for a specific comment.
	 *
	 * @param comment - The parent comment object.
	 * @returns The number of likes for the specified comment.
	 */
	@ResolveField(() => Number)
	async likesCount(@Parent() comment: Comment) {
		return this.likesService.getCommentLikesCount(comment.id);
	}

	/**
	 * Resolves the count of replies for a specific comment.
	 *
	 * @param comment - The parent comment object.
	 * @returns The number of replies for the specified comment.
	 */
	@ResolveField(() => Number)
	async repliesCount(@Parent() comment: Comment) {
		return this.commentsService.getRepliesCount(comment.id);
	}

	/**
	 * Resolves the user who authored the comment.
	 *
	 * @param comment - The parent comment object.
	 * @returns The User object representing the author of the comment.
	 */
	@ResolveField(() => User)
	async user(@Parent() comment: Comment) {
		return this.commentsService.getCommentAuthor(comment.id);
	}

	/**
	 * Checks if the current authenticated user has liked the specified comment.
	 *
	 * @param comment - The parent comment object.
	 * @param context - The request context containing user information.
	 * @returns True if the authenticated user has liked the comment, otherwise false.
	 */
	@ResolveField(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async isLiked(@Parent() comment: Comment, @Context() context) {
		const userId = context.req.user.id;
		return this.likesService.hasCommentLiked(comment.id, userId);
	}

	/**
	 * Resolves the parent comment for a reply.
	 *
	 * @param comment - The reply comment object.
	 * @returns The parent Comment object if it exists.
	 */
	@ResolveField(() => Comment, { nullable: true })
	async parentComment(@Parent() comment: Comment) {
		return this.commentsService.getParentComment(comment.id);
	}

	/**
	 * Resolves the parent reply for a comment.
	 *
	 * @param comment - The comment object.
	 * @returns The parent Comment object that is a reply if it exists.
	 */
	@ResolveField(() => Comment, { nullable: true })
	async parentReply(@Parent() comment: Comment) {
		return this.commentsService.getParenReply(comment.id);
	}

	/**
	 * Resolves the story associated with a comment.
	 *
	 * @param comment - The comment object.
	 * @returns The Story object associated with the comment.
	 */
	@ResolveField(() => Story)
	async story(@Parent() comment: Comment) {
		return this.commentsService.getCommentStory(comment.id);
	}
}
