import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HasLikedResponse {
	@Field()
	liked: boolean;
}
