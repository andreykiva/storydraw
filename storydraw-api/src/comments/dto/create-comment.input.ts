import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class CreateCommentInput {
	@Field()
	@IsNotEmpty()
	@IsUUID()
	storyId: string;

	@Field()
	@IsNotEmpty()
	@IsString()
	@MaxLength(100)
	content: string;
}

@InputType()
export class CreateReplyInput {
	@Field()
	@IsNotEmpty()
	@IsUUID()
	commentId: string;

	@Field()
	@IsNotEmpty()
	@IsString()
	@MaxLength(100)
	content: string;
}
