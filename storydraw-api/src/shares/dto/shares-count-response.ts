import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Response Data Transfer Object for the number of shares of a story.
 */
@ObjectType()
export class SharesCountResponse {
	/**
	 * The total number of shares for the associated story.
	 */
	@Field()
	count: number;
}
