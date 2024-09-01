import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CommentsCountInput {
	@Field()
	@IsNotEmpty()
	@IsUUID()
	storyId: string;
}
