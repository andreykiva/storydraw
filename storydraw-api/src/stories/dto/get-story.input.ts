import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class GetStoryInput {
	@Field()
	@IsNotEmpty()
	@IsUUID()
	storyId: string;
}
