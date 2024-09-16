import { ObjectType } from '@nestjs/graphql';
import { NotificationType } from '../enums/entity-type.enum';
import { User } from 'src/users/entities/user.entity';
import { Story } from 'src/stories/entities/story.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Follow } from 'src/follows/entities/follow.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@ObjectType()
export class CreateNotificationDto {
	type: NotificationType;
	user: User;
	initiator: User;
	story?: Story;
	like?: Like;
	follow?: Follow;
	comment?: Comment;
}
