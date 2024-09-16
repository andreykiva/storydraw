import { Follow } from 'src/follows/entities/follow.entity';
import { User } from 'src/users/entities/user.entity';

export class FollowCreatedEvent {
	user: User;
	initiator: User;
	follow: Follow;
}
