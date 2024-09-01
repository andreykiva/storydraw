import { Resolver, Args, Mutation, Context, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Like } from './entities/like.entity';
import { LikesService } from './services/likes.service';
import { LikeCommentInput, LikeStoryInput } from './dto/like.input';
import { HasLikedResponse } from './dto/has-liked-response';
import { LikesCountResponse } from './dto/likes-count-response';
import { UnlikeResponse } from './dto/unlike-response';
import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Resolver(() => Like)
export class LikesResolver {
	constructor(private readonly likesService: LikesService) {}

	@Mutation(() => Like)
	@UseGuards(JwtAuthGuard)
	async likeStory(@Context() context, @Args('likeStoryInput') likeStoryInput: LikeStoryInput) {
		const user = context.req.user;
		return this.likesService.likeStory(likeStoryInput.storyId, user);
	}

	@Mutation(() => Like)
	@UseGuards(JwtAuthGuard)
	async likeComment(@Context() context, @Args('likeCommentInput') likeCommentInput: LikeCommentInput) {
		const user = context.req.user;
		return this.likesService.likeComment(likeCommentInput.commentId, user);
	}

	@Mutation(() => UnlikeResponse)
	@UseGuards(JwtAuthGuard)
	async unlikeStory(@Context() context, @Args('unlikeStoryInput') unlikeStoryInput: LikeStoryInput) {
		const userId = context.req.user.id;
		await this.likesService.unlikeStory(unlikeStoryInput.storyId, userId);
		return { success: true };
	}

	@Mutation(() => UnlikeResponse)
	@UseGuards(JwtAuthGuard)
	async unlikeComment(@Context() context, @Args('unlikeCommentInput') unlikeCommentInput: LikeCommentInput) {
		const userId = context.req.user.id;
		await this.likesService.unlikeComment(unlikeCommentInput.commentId, userId);
		return { success: true };
	}

	@Query(() => LikesCountResponse)
	@UseGuards(JwtAuthGuard)
	async storyLikesCount(@Args('likesCountInput') likesCountInput: LikeStoryInput) {
		const count = await this.likesService.getStoryLikesCount(likesCountInput.storyId);
		return { count };
	}

	@Query(() => LikesCountResponse)
	@UseGuards(JwtAuthGuard)
	async commentLikesCount(@Args('likesCountInput') likesCountInput: LikeCommentInput) {
		const count = await this.likesService.getCommentLikesCount(likesCountInput.commentId);
		return { count };
	}

	@Query(() => HasLikedResponse)
	@UseGuards(JwtAuthGuard)
	async hasStoryLiked(@Context() context, @Args('hasStoryLikedInput') hasStoryLikedInput: LikeStoryInput) {
		const userId = context.req.user.id;
		const like = await this.likesService.findStoryLike(hasStoryLikedInput.storyId, userId);

		return { liked: !!like };
	}

	@Query(() => HasLikedResponse)
	@UseGuards(JwtAuthGuard)
	async hasCommentLiked(@Context() context, @Args('hasCommentLikedInput') hasCommentLikedInput: LikeCommentInput) {
		const userId = context.req.user.id;
		const like = await this.likesService.findCommentLike(hasCommentLikedInput.commentId, userId);

		return { liked: !!like };
	}

	@ResolveField(() => Story, { nullable: true })
	async story(@Parent() like: Like) {
		return this.likesService.getLikedStory(like.id);
	}

	@ResolveField(() => User)
	async user(@Parent() like: Like) {
		return this.likesService.getLikeUser(like.id);
	}

	@ResolveField(() => Comment, { nullable: true })
	async comment(@Parent() like: Like) {
		return this.likesService.getLikedComment(like.id);
	}
}
