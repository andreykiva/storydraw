import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FavoritesCountResponse {
	@Field()
	count: number;
}
