import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

/**
 * Input Data Transfer Object for retrieving a user's favorite stories.
 */
@InputType()
export class GetUserFavoritesInput {
	/**
	 * The unique identifier of the user whose favorites are being retrieved.
	 * Must be a valid UUID and cannot be empty.
	 */
	@Field()
	@IsNotEmpty()
	@IsUUID()
	userId: string;
}
