import { ObjectType } from '@nestjs/graphql';
import { NotificationType } from '../enums/entity-type.enum';
import { User } from 'src/users/entities/user.entity';
import { Story } from 'src/stories/entities/story.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Follow } from 'src/follows/entities/follow.entity';
import { Comment } from 'src/comments/entities/comment.entity';

/**
 * Data Transfer Object for creating a notification.
 */
@ObjectType()
export class CreateNotificationDto {
	/**
	 * The type of notification being created.
	 */
	type: NotificationType;

	/**
	 * The user who will receive the notification.
	 */
	user: User;

	/**
	 * The user who initiated the action that caused the notification.
	 */
	initiator: User;

	/**
	 * The story associated with the notification (optional).
	 */
	story?: Story;

	/**
	 * The like associated with the notification (optional).
	 */
	like?: Like;

	/**
	 * The follow action associated with the notification (optional).
	 */
	follow?: Follow;

	/**
	 * The comment associated with the notification (optional).
	 */
	comment?: Comment;
}
