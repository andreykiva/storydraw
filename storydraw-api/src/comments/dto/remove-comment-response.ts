import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Response Data Transfer Object for the removal of a comment.
 */
@ObjectType()
export class RemoveCommentResponse {
	/**
	 * Indicates whether the comment removal was successful.
	 */
	@Field()
	success: boolean;
}
