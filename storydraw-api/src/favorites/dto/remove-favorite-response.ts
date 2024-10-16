import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Response Data Transfer Object for removing a favorite story.
 */
@ObjectType()
export class RemoveFavoriteResponse {
	/**
	 * Indicates whether the removal of the favorite story was successful.
	 */
	@Field()
	success: boolean;
}
