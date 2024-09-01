import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UnfollowResponse {
	@Field()
	success: boolean;
}
