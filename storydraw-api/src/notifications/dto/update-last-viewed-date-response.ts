import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Represents the response for updating the last viewed date.
 */
@ObjectType()
export class UpdateLastViewedDateResponse {
	/**
	 * Indicates whether the update was successful or not.
	 */
	@Field()
	success: boolean;
}
