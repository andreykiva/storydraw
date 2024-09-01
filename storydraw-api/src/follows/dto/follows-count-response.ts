import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FollowsCountResponse {
	@Field()
	count: number;
}
