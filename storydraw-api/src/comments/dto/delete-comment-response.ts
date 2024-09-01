import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteCommentResponse {
	@Field()
	success: boolean;
}
