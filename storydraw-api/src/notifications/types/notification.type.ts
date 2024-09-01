import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { Like } from 'src/likes/entities/like.entity';
import { NotificationType } from '../enums/entity-type.enum';

@ObjectType()
export class LikeNotification {
	@Field()
	id: string;

	@Field(() => NotificationType)
	type: NotificationType;

	@Field(() => Date)
	createdAt: Date;

	@Field()
	isRead: boolean;

	@Field(() => Like)
	like: Like;
}

// @ObjectType()
// export class CommentNotification {
// 	@Field(() => ID)
// 	id: string;

// 	@Field()
// 	createdAt: Date;

// 	@Field()
// 	isRead: boolean;

// 	@Field(() => User)
// 	user: User;

// 	@Field(() => Comment)
// 	comment: Comment;
// }

export const NotificationUnion = createUnionType({
	name: 'NotificationUnion',
	types: () => [LikeNotification],
	resolveType(value) {
		console.log(value.typr);
		console.log(NotificationType.LIKE);
		if (value.type === NotificationType.LIKE) {
			console.log(value);
			return LikeNotification;
		}
		return null;
	},
});
