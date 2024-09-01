import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SharesCountResponse {
	@Field()
	count: number;
}
