import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NotificationsCountSubscribe {
	@Field(() => Int)
	count: number;

	@Field()
	userId: string;
}
