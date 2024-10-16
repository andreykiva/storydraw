import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { PaginationInput } from 'src/common/dto/pagination.dto';

/**
 * Input Data Transfer Object for pagination of replies.
 * Extends PaginationInput, overriding the limit property to define a maximum of replies returned.
 */
@InputType()
export class RepliesPaginationInput extends PaginationInput {
	/**
	 * The maximum number of replies to return.
	 * Must be an integer between 1 and 20, inclusive.
	 * Defaults to 3 if not provided.
	 */
	@Field(() => Int, { defaultValue: 3 })
	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(20)
	limit?: number;
}
