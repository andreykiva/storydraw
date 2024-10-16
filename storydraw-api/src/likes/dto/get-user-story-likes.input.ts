import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

/**
 * Input Data Transfer Object for retrieving the likes of a user on stories.
 */
@InputType()
export class GetUserStoryLikesInput {
	/**
	 * The unique identifier of the user whose story likes are to be retrieved.
	 * Must be a non-empty UUID.
	 */
	@Field()
	@IsNotEmpty()
	@IsUUID()
	userId: string;
}
