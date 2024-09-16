import { Comment } from 'src/comments/entities/comment.entity';
import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/users/entities/user.entity';

export class MentionCreatedEvent {
	user: User;
	initiator: User;
	comment?: Comment;
	story: Story;
}
