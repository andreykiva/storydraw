import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class FavoritesCountInput {
	@Field()
	@IsNotEmpty()
	@IsUUID()
	storyId: string;
}
