import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Response Data Transfer Object indicating whether a user exists.
 */
@ObjectType()
export class UserExistsResponse {
	/**
	 * Indicates if the user exists in the system.
	 * Returns true if the user is found, false otherwise.
	 */
	@Field()
	exists: boolean;
}
