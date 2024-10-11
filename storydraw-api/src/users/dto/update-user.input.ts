import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, Length, Matches, MaxLength } from 'class-validator';
import { USERNAME_PATTERN } from 'src/common/constants/regexp.constants';

/**
 * Input Data Transfer Object for updating user information.
 */
@InputType()
export class UpdateUserInput {
	/**
	 * The new username for the user (optional).
	 * Must be a string between 5 and 24 characters and match the username pattern.
	 */
	@Field()
	@IsOptional()
	@IsString()
	@Length(5, 24)
	@Matches(USERNAME_PATTERN, { message: 'Invalid username format' })
	username: string;

	/**
	 * The display name for the user (optional).
	 * Must be a string between 1 and 30 characters.
	 */
	@Field()
	@IsOptional()
	@IsString()
	@Length(1, 30)
	displayName: string;

	/**
	 * A brief bio for the user (optional).
	 * Must be a string with a maximum length of 80 characters.
	 */
	@Field()
	@IsOptional()
	@IsString()
	@MaxLength(80)
	bio: string;
}

/**
 * Input Data Transfer Object for updating a user's username.
 */
@InputType()
export class UpdateUsernameInput {
	/**
	 * The new username for the user.
	 * Must be a non-empty string between 5 and 24 characters and match the username pattern.
	 */
	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(5, 24)
	@Matches(USERNAME_PATTERN, { message: 'Invalid username format' })
	username: string;
}
