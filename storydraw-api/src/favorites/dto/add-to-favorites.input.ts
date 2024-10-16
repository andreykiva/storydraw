import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

/**
 * Input Data Transfer Object for adding a story to the user's favorites.
 */
@InputType()
export class AddFavoriteInput {
	/**
	 * The unique identifier of the story to be added to favorites.
	 * Must be a non-empty UUID.
	 */
	@Field()
	@IsNotEmpty()
	@IsUUID()
	storyId: string;
}
