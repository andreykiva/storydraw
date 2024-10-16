import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

/**
 * Input Data Transfer Object for retrieving comments associated with a specific story.
 */
@InputType()
export class GetCommentsInput {
	/**
	 * The ID of the story for which comments are requested.
	 * Must be a valid UUID and cannot be empty.
	 */
	@Field()
	@IsNotEmpty()
	@IsUUID()
	storyId: string;
}

/**
 * Input Data Transfer Object for retrieving replies associated with a specific comment.
 */
@InputType()
export class GetRepliesInput {
	/**
	 * The ID of the comment for which replies are requested.
	 * Must be a valid UUID and cannot be empty.
	 */
	@Field()
	@IsNotEmpty()
	@IsUUID()
	commentId: string;
}
