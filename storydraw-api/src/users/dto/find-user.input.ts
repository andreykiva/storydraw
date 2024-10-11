import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { USERNAME_PATTERN } from 'src/common/constants/regexp.constants';

/**
 * Input Data Transfer Object for finding a user by username.
 */
@InputType()
export class FindOneByUsernameInput {
	/**
	 * The username of the user to be found.
	 * Must be a non-empty string, between 5 and 24 characters,
	 * and match the defined username pattern.
	 */
	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(5, 24)
	@Matches(USERNAME_PATTERN, { message: 'Invalid username format' })
	username: string;
}
