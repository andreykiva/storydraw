import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Response type for the count of followers or following users.
 *
 * This class represents the structure of the response returned when
 * querying the number of followers or following users for a specific user.
 */
@ObjectType()
export class FollowsCountResponse {
	/**
	 * The total count of followers or following users.
	 */
	@Field()
	count: number;
}
