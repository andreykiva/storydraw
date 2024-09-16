import { Like } from 'src/likes/entities/like.entity';
import { Story } from 'src/stories/entities/story.entity';
import { User } from 'src/users/entities/user.entity';

export class LikeCreatedEvent {
	user: User;
	initiator: User;
	like: Like;
	story: Story;
}
