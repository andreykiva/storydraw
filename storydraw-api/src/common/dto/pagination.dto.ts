import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDate, IsInt, IsOptional, Max, Min } from 'class-validator';

@InputType()
export class PaginationInput {
	@Field(() => Int, { defaultValue: 10 })
	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(20)
	limit?: number;

	@Field({ nullable: true })
	@IsOptional()
	@IsDate()
	cursor?: Date;
}
