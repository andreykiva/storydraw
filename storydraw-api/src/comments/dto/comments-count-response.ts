import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentsCountResponse {
	@Field()
	count: number;
}
