import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

/**
 * Input Data Transfer Object for liking a story.
 */
@InputType()
export class LikeStoryInput {
	/**
	 * The unique identifier of the story to be liked.
	 * Must be a non-empty UUID.
	 */
	@Field()
	@IsNotEmpty()
	@IsUUID()
	storyId: string;
}

/**
 * Input Data Transfer Object for liking a comment.
 */
@InputType()
export class LikeCommentInput {
	/**
	 * The unique identifier of the comment to be liked.
	 * Must be a non-empty UUID.
	 */
	@Field()
	@IsNotEmpty()
	@IsUUID()
	commentId: string;
}

/**
 * Input Data Transfer Object for liking a message.
 */
@InputType()
export class LikeMessageInput {
	/**
	 * The unique identifier of the message to be liked.
	 * Must be a non-empty UUID.
	 */
	@Field()
	@IsNotEmpty()
	@IsUUID()
	messageId: string;
}
