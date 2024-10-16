import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

/**
 * Input Data Transfer Object for retrieving favorites associated with a specific user.
 */
@InputType()
export class GetFavoritesInput {
	/**
	 * The unique identifier of the user for whom favorites are being retrieved.
	 * Must be a valid UUID and cannot be empty.
	 */
	@Field()
	@IsNotEmpty()
	@IsUUID()
	userId: string;
}
