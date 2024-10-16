import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

/**
 * Input Data Transfer Object for retrieving the shares count of a story.
 */
@InputType()
export class GetSharesCountInput {
	/**
	 * The ID of the story for which to count shares.
	 * Must be a non-empty UUID string.
	 */
	@Field()
	@IsNotEmpty()
	@IsUUID()
	storyId: string;
}
