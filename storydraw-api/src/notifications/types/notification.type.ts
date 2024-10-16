import { createUnionType, Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Like } from 'src/likes/entities/like.entity';
import { NotificationType } from '../enums/entity-type.enum';
import { User } from 'src/users/entities/user.entity';
import { Follow } from 'src/follows/entities/follow.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Story } from 'src/stories/entities/story.entity';

/**
 * Represents a notification for a like event.
 */
@ObjectType()
export class LikeNotification {
	@Field()
	id: string;

	@Field(() => NotificationType)
	type: NotificationType;

	@Field(() => User)
	initiator: User;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Story)
	story: Story;

	@Field(() => Like)
	like: Like;
}

/**
 * Represents a notification for a comment event.
 */
@ObjectType()
export class CommentNotification {
	@Field()
	id: string;

	@Field(() => NotificationType)
	type: NotificationType;

	@Field(() => User)
	initiator: User;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Story)
	story: Story;

	@Field(() => Comment, { nullable: true })
	comment?: Comment; // Comment can be null if no comment is associated
}

/**
 * Represents a notification for a mention event.
 */
@ObjectType()
export class MentionNotification {
	@Field()
	id: string;

	@Field(() => NotificationType)
	type: NotificationType;

	@Field(() => User)
	initiator: User;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Story)
	story: Story;

	@Field(() => Comment, { nullable: true })
	comment?: Comment; // Comment can be null if no comment is associated
}

/**
 * Represents a notification for a follow event.
 */
@ObjectType()
export class FollowNotification {
	@Field()
	id: string;

	@Field(() => NotificationType)
	type: NotificationType;

	@Field(() => User)
	initiator: User;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Follow)
	follow: Follow;
}

// Register the NotificationType enum with GraphQL
registerEnumType(NotificationType, {
	name: 'NotificationType',
});

/**
 * Union type for all notification types.
 * Allows queries to return different types of notifications.
 */
export const NotificationUnion = createUnionType({
	name: 'NotificationUnion',
	types: () => [LikeNotification, CommentNotification, MentionNotification, FollowNotification],
	resolveType(value) {
		if (value.type === NotificationType.LIKE) {
			return LikeNotification;
		}

		if (value.type === NotificationType.COMMENT) {
			return CommentNotification;
		}

		if (value.type === NotificationType.MENTION) {
			return MentionNotification;
		}

		if (value.type === NotificationType.FOLLOW) {
			return FollowNotification;
		}

		return null; // If no type matches, return null
	},
});
