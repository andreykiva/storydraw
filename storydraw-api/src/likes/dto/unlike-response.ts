import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UnlikeResponse {
	@Field()
	success: boolean;
}
