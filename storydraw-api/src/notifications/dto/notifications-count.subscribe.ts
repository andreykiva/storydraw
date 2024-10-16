import { Field, Int, ObjectType } from '@nestjs/graphql';

/**
 * Represents the notification count subscription payload for a user.
 */
@ObjectType()
export class NotificationsCountSubscribe {
	/**
	 * The count of new notifications for the user.
	 */
	@Field(() => Int)
	count: number;

	/**
	 * The unique identifier of the user whose notification count is being updated.
	 */
	@Field()
	userId: string;
}
