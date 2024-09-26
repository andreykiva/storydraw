import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { PaginationInput } from 'src/common/dto/pagination.dto';

@InputType()
export class RepliesPaginationInput extends PaginationInput {
	@Field(() => Int, { defaultValue: 3 })
	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(20)
	limit?: number;
}
