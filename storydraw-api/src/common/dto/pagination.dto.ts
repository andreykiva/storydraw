import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDate, IsInt, IsOptional, Max, Min } from 'class-validator';

/**
 * Input Data Transfer Object for pagination.
 * It allows specifying a limit on the number of items returned
 * and an optional cursor for paginated responses.
 */
@InputType()
export class PaginationInput {
	/**
	 * The maximum number of items to return.
	 * Defaults to 10 if not provided.
	 * Must be an integer between 1 and 20.
	 */
	@Field(() => Int, { defaultValue: 10 })
	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(20)
	limit?: number;

	/**
	 * An optional cursor for pagination.
	 * Used to retrieve items created after the specified date.
	 */
	@Field({ nullable: true })
	@IsOptional()
	@IsDate()
	cursor?: Date;
}
