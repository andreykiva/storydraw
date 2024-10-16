import { Like } from 'src/likes/entities/like.entity';
import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/users/entities/user.entity';

/**
 * Event triggered when a new like action occurs.
 */
export class LikeCreatedEvent {
	/**
	 * The user who is liking the story.
	 */
	user: User;

	/**
	 * The user who initiated the like action.
	 */
	initiator: User;

	/**
	 * The like action that was created.
	 */
	like: Like;

	/**
	 * The story that was liked.
	 */
	story: Story;
}
