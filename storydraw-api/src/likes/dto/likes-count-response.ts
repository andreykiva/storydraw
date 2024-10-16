import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Response Data Transfer Object for returning the count of likes.
 */
@ObjectType()
export class LikesCountResponse {
	/**
	 * The total number of likes.
	 */
	@Field()
	count: number;
}
