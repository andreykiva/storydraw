import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GenerateCodeResponse {
	@Field()
	success: boolean;

	@Field()
	message: string;
}
