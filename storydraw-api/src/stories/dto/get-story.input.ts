import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

/**
 * Input Data Transfer Object for retrieving a story by its ID.
 */
@InputType()
export class GetStoryInput {
	/**
	 * The unique identifier of the story to be retrieved.
	 * Must be a non-empty UUID.
	 */
	@Field()
	@IsNotEmpty()
	@IsUUID()
	storyId: string;
}
