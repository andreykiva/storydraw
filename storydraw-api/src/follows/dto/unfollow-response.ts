import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Response Data Transfer Object for unfollow.
 */
@ObjectType()
export class UnfollowResponse {
	/**
	 * Indicates if the unfollow operation was successful.
	 */
	@Field()
	success: boolean;
}
