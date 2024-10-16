import { Comment } from 'src/comments/entities/comment.entity';
import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/users/entities/user.entity';

/**
 * Represents the event of a comment being created.
 */
export class CommentCreatedEvent {
	/**
	 * The user who owns the story or content that was commented on.
	 */
	user: User;

	/**
	 * The user who initiated the comment.
	 */
	initiator: User;

	/**
	 * The comment that was created.
	 */
	comment: Comment;

	/**
	 * The story or content associated with the comment.
	 */
	story: Story;
}
