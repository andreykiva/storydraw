import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/users/entities/user.entity';

/**
 * Event representing the creation of a new story.
 */
export class StoryCreatedEvent {
	/**
	 * The user who created the story.
	 */
	user: User;

	/**
	 * The story that was created.
	 */
	story: Story;
}
