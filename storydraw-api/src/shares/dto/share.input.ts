import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

/**
 * Input Data Transfer Object for sharing a story.
 */
@InputType()
export class ShareInput {
	/**
	 * The ID of the story to be shared.
	 * Must be a non-empty UUID string.
	 */
	@Field()
	@IsNotEmpty()
	@IsUUID()
	storyId: string;
}
