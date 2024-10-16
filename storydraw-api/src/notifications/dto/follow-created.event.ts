import { Follow } from 'src/follows/entities/follow.entity';
import { User } from 'src/users/entities/user.entity';

/**
 * Event triggered when a new follow action occurs.
 */
export class FollowCreatedEvent {
	/**
	 * The user who is being followed.
	 */
	user: User;

	/**
	 * The user who initiated the follow action.
	 */
	initiator: User;

	/**
	 * The follow action that was created.
	 */
	follow: Follow;
}
