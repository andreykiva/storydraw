import { Field, ObjectType } from '@nestjs/graphql';

/**
 * Response DTO for generating a verification code.
 */
@ObjectType()
export class GenerateCodeResponse {
	/**
	 * Indicates whether the code generation was successful.
	 */
	@Field()
	success: boolean;

	/**
	 * A message providing additional information about the code generation process.
	 */
	@Field()
	message: string;
}
