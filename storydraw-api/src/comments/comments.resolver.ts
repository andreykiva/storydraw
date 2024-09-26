import { Resolver, Args, Mutation, Context, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCommentInput, CreateReplyInput } from './dto/create-comment.input';
import { CommentsService } from './services/comments.service';
import { DeleteCommentInput } from './dto/delete-comment.input';
import { CommentsCountInput } from './dto/comments-count.input';
import { GetCommentsInput, GetRepliesInput } from './dto/get-comments.input';
import { Comment } from './entities/comment.entity';
import { CommentsCountResponse } from './dto/comments-count-response';
import { LikesService } from 'src/likes/services/likes.service';
import { DeleteCommentResponse } from './dto/delete-comment-response';
import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/users/entities/user.entity';
import { PaginationInput } from 'src/common/dto/pagination.dto';
import { RepliesPaginationInput } from './dto/replies-pagination.input';

@Resolver(() => Comment)
export class CommentsResolver {
	constructor(
		private readonly commentsService: CommentsService,
		private readonly likesService: LikesService,
	) {}

	@Query(() => [Comment])
	async getComments(
		@Args('getCommentsInput') getCommentsInput: GetCommentsInput,
		@Args('paginationInput', { nullable: true }) paginationInput?: PaginationInput,
	) {
		const { limit = 10, cursor = null } = paginationInput || {};
		return this.commentsService.getComments(getCommentsInput.storyId, { limit, cursor });
	}

	@Query(() => [Comment])
	async getReplies(
		@Args('getRepliesInput') getRepliesInput: GetRepliesInput,
		@Args('paginationInput', { nullable: true }) paginationInput?: RepliesPaginationInput,
	) {
		const { limit = 3, cursor = null } = paginationInput || {};
		return this.commentsService.getReplies(getRepliesInput.commentId, { limit, cursor });
	}

	@Mutation(() => Comment)
	@UseGuards(JwtAuthGuard)
	async createComment(@Context() context, @Args('createCommentInput') createCommentInput: CreateCommentInput) {
		const user = context.req.user;
		return this.commentsService.createComment(createCommentInput, user);
	}

	@Mutation(() => Comment)
	@UseGuards(JwtAuthGuard)
	async createReply(@Context() context, @Args('createReplyInput') createReplyInput: CreateReplyInput) {
		const user = context.req.user;
		return this.commentsService.createReply(createReplyInput, user);
	}

	@Mutation(() => DeleteCommentResponse)
	@UseGuards(JwtAuthGuard)
	async deleteComment(@Context() context, @Args('deleteCommentInput') deleteCommentInput: DeleteCommentInput) {
		const userId = context.req.user.id;
		await this.commentsService.deleteComment(deleteCommentInput.commentId, userId);
		return { success: true };
	}

	@Query(() => CommentsCountResponse)
	async commentsCount(@Args('commentsCountInput') commentsCountInput: CommentsCountInput) {
		const count = await this.commentsService.getCommentsCount(commentsCountInput.storyId);
		return { count };
	}

	@ResolveField(() => Number)
	async likesCount(@Parent() comment: Comment) {
		return this.likesService.getCommentLikesCount(comment.id);
	}

	@ResolveField(() => Number)
	async repliesCount(@Parent() comment: Comment) {
		return this.commentsService.getRepliesCount(comment.id);
	}

	@ResolveField(() => User)
	async user(@Parent() comment: Comment) {
		return this.commentsService.getCommentAuthor(comment.id);
	}

	@ResolveField(() => Boolean)
	@UseGuards(JwtAuthGuard)
	async isLiked(@Parent() comment: Comment, @Context() context) {
		const userId = context.req.user.id;
		return this.likesService.hasCommentLiked(comment.id, userId);
	}

	@ResolveField(() => Comment, { nullable: true })
	async parentComment(@Parent() comment: Comment) {
		return this.commentsService.getParentComment(comment.id);
	}

	@ResolveField(() => Comment, { nullable: true })
	async parentReply(@Parent() comment: Comment) {
		return this.commentsService.getParenReply(comment.id);
	}

	@ResolveField(() => Story)
	async story(@Parent() comment: Comment) {
		return this.commentsService.getCommentStory(comment.id);
	}
}
