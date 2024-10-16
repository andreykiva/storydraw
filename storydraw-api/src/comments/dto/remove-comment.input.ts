import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

/**
 * Input Data Transfer Object for removing a comment.
 */
@InputType()
export class RemoveCommentInput {
	/**
	 * The unique identifier of the comment to be removed.
	 * Must be a non-empty UUID string.
	 */
	@Field()
	@IsNotEmpty()
	@IsUUID()
	commentId: string;
}
