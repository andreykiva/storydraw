import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

/**
 * Input Data Transfer Object for retrieving the count of favorites for a specific story.
 */
@InputType()
export class GetFavoritesCountInput {
	/**
	 * The unique identifier of the story for which the favorites count is requested.
	 * Must be a valid UUID and cannot be empty.
	 */
	@Field()
	@IsNotEmpty()
	@IsUUID()
	storyId: string;
}
