import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, MaxLength, IsNotEmpty, IsUrl } from 'class-validator';

/**
 * Input Data Transfer Object for the first drawing associated with a story.
 */
@InputType()
class FirstDrawingInput {
	/**
	 * The URL of the image for the first drawing.
	 * Must be a valid URL and cannot be empty.
	 */
	@Field()
	@IsNotEmpty()
	@IsUrl()
	imageUrl: string;
}

/**
 * Input Data Transfer Object for creating a new story.
 */
@InputType()
export class CreateStoryInput {
	/**
	 * The unique identifier of the music associated with the story.
	 * Optional field, must be a string if provided.
	 */
	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	musicId?: string;

	/**
	 * The title of the story.
	 * Must be a non-empty string with a maximum length of 36 characters.
	 */
	@Field()
	@IsNotEmpty()
	@IsString()
	@MaxLength(36)
	title: string;

	/**
	 * A brief description of the story.
	 * Optional field, must be a string with a maximum length of 80 characters if provided.
	 */
	@Field({ nullable: true })
	@IsOptional()
	@IsString()
	@MaxLength(80)
	description?: string;

	/**
	 * The first drawing associated with the story.
	 * Must be provided as an instance of FirstDrawingInput.
	 */
	@Field(() => FirstDrawingInput)
	drawing: FirstDrawingInput;
}
