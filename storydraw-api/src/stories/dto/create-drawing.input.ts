import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUrl, IsUUID } from 'class-validator';

@InputType()
export class CreateDrawingInput {
	@Field()
	@IsNotEmpty()
	@IsUUID()
	storyId: string;

	@Field()
	@IsNotEmpty()
	@IsUrl()
	imageUrl: string;
}
