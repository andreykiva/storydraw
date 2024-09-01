import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RemoveFavoriteResponse {
	@Field()
	success: boolean;
}
