import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Response object containing the count of favorites for a specific story.
 */
@ObjectType()
export class FavoritesCountResponse {
	/**
	 * The total number of favorites associated with the story.
	 */
	@Field()
	count: number;
}
