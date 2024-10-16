import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Response type for the count of comments.
 */
@ObjectType()
export class CommentsCountResponse {
	/**
	 * The total count of comments.
	 */
	@Field()
	count: number;
}
