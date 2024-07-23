import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CheckUserExistsResponse {
	@Field()
	exists: boolean;
}
