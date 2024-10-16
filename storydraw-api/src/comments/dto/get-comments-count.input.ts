import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

/**
 * Input Data Transfer Object for retrieving the count of comments
 * associated with a specific story.
 */
@InputType()
export class GetCommentsCountInput {
	/**
	 * The ID of the story for which the comments count is requested.
	 * Must be a valid UUID and cannot be empty.
	 */
	@Field()
	@IsNotEmpty()
	@IsUUID()
	storyId: string;
}
