import { Comment } from 'src/comments/entities/comment.entity';
import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/users/entities/user.entity';

/**
 * Event triggered when a new mention action occurs.
 */
export class MentionCreatedEvent {
	/**
	 * The user who is being mentioned.
	 */
	user: User;

	/**
	 * The user who initiated the mention action.
	 */
	initiator: User;

	/**
	 * The comment where the mention occurred (optional).
	 */
	comment?: Comment;

	/**
	 * The story associated with the mention.
	 */
	story: Story;
}
