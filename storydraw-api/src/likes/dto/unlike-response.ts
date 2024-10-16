import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Response Data Transfer Object for indicating the result of an unlike operation.
 */
@ObjectType()
export class UnlikeResponse {
	/**
	 * Indicates whether the unlike operation was successful.
	 */
	@Field()
	success: boolean;
}
