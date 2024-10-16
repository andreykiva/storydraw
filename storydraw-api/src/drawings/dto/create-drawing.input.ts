import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUrl, IsUUID } from 'class-validator';

/**
 * Input Data Transfer Object for creating a new drawing.
 */
@InputType()
export class CreateDrawingInput {
	/**
	 * The ID of the story to which the drawing is associated.
	 * Must be a non-empty UUID string.
	 */
	@Field()
	@IsNotEmpty()
	@IsUUID()
	storyId: string;

	/**
	 * The URL of the image for the drawing.
	 * Must be a non-empty valid URL.
	 */
	@Field()
	@IsNotEmpty()
	@IsUrl()
	imageUrl: string;
}
