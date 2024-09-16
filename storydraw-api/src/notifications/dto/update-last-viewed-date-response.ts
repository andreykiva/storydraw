import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateLastViewedDateResponse {
	@Field()
	success: boolean;
}
