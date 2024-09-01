import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class FollowInput {
	@Field()
	@IsNotEmpty()
	@IsUUID()
	userId: string;
}
