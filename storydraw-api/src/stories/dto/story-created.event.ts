import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/users/entities/user.entity';

export class StoryCreatedEvent {
	user: User;
	story: Story;
}
