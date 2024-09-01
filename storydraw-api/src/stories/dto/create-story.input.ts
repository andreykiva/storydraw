import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, MaxLength, IsNotEmpty, IsUrl } from 'class-validator';

@InputType()
class FirstDrawingInput {
	@Field()
	@IsNotEmpty()
	@IsUrl()
	imageUrl: string;
}

@InputType()
export class CreateStoryInput {
	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	musicId?: string;

	@Field()
	@IsNotEmpty()
	@IsString()
	@MaxLength(36)
	title: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	@MaxLength(80)
	description?: string;

	@Field(() => FirstDrawingInput)
	drawing: FirstDrawingInput;
}
