import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class LikeStoryInput {
	@Field()
	@IsNotEmpty()
	@IsUUID()
	storyId: string;
}

@InputType()
export class LikeCommentInput {
	@Field()
	@IsNotEmpty()
	@IsUUID()
	commentId: string;
}

@InputType()
export class LikeMessageInput {
	@Field()
	@IsNotEmpty()
	@IsUUID()
	messageId: string;
}
