import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class DeleteCommentInput {
	@Field()
	@IsNotEmpty()
	@IsUUID()
	commentId: string;
}
