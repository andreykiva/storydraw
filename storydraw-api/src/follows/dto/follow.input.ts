import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

/**
 * Input type for follow and unfollow operations.
 *
 * This class represents the required data for a user to follow
 * or unfollow another user, specifically the target user's ID.
 */
@InputType()
export class FollowInput {
	/**
	 * Unique identifier of the user to follow or unfollow.
	 * Must be a valid UUID.
	 */
	@Field()
	@IsNotEmpty()
	@IsUUID()
	userId: string;
}
