import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class GetCommentsInput {
	@Field()
	@IsNotEmpty()
	@IsUUID()
	storyId: string;
}

@InputType()
export class GetRepliesInput {
	@Field()
	@IsNotEmpty()
	@IsUUID()
	commentId: string;
}
