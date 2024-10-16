import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

/**
 * Input Data Transfer Object for retrieving stories associated with a user.
 */
@InputType()
export class GetUserStoriesInput {
	/**
	 * The unique identifier of the user whose stories are to be retrieved.
	 * Must be a non-empty UUID.
	 */
	@Field()
	@IsNotEmpty()
	@IsUUID()
	userId: string;
}
