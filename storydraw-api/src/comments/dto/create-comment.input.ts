import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

/**
 * Input Data Transfer Object for creating a new comment.
 */
@InputType()
export class CreateCommentInput {
	/**
	 * The ID of the story to which the comment belongs.
	 * Must be a valid UUID and cannot be empty.
	 */
	@Field()
	@IsNotEmpty()
	@IsUUID()
	storyId: string;

	/**
	 * The content of the comment.
	 * Must be a non-empty string with a maximum length of 100 characters.
	 */
	@Field()
	@IsNotEmpty()
	@IsString()
	@MaxLength(100)
	content: string;
}

/**
 * Input Data Transfer Object for creating a reply to a comment.
 */
@InputType()
export class CreateReplyInput {
	/**
	 * The ID of the comment to which the reply belongs.
	 * Must be a valid UUID and cannot be empty.
	 */
	@Field()
	@IsNotEmpty()
	@IsUUID()
	commentId: string;

	/**
	 * The content of the reply.
	 * Must be a non-empty string with a maximum length of 100 characters.
	 */
	@Field()
	@IsNotEmpty()
	@IsString()
	@MaxLength(100)
	content: string;
}
