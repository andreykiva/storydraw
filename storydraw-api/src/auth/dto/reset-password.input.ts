import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber, IsString, Length, Matches, IsNotEmpty } from 'class-validator';
import { PASSWORD_PATTERN } from 'src/common/constants/regexp.constants';

/**
 * Input DTO for resetting the password using a phone number and a verification code.
 */
@InputType()
export class ResetWithPhoneInput {
	/**
	 * The phone number of the user.
	 * Must be a valid phone number format.
	 * @example "+1234567890"
	 */
	@Field()
	@IsString()
	@IsNotEmpty()
	@IsPhoneNumber()
	phone: string;

	/**
	 * The verification code sent to the user's phone.
	 * Must be a string with exactly 6 characters.
	 */
	@Field()
	@IsNotEmpty()
	@IsString()
	@Length(6)
	code: string;

	/**
	 * The new password for the user.
	 * Must be a string between 8 and 24 characters and match the specified password pattern.
	 */
	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(8, 24)
	@Matches(PASSWORD_PATTERN, { message: 'Invalid password format' })
	password: string;
}

/**
 * Input DTO for resetting the password using an email address and a verification code.
 */
@InputType()
export class ResetWithEmailInput {
	/**
	 * The email address of the user.
	 * Must be a valid email format.
	 * @example "user@example.com"
	 */
	@Field()
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	/**
	 * The verification code sent to the user's email.
	 * Must be a string with exactly 6 characters.
	 */
	@Field()
	@IsNotEmpty()
	@IsString()
	@Length(6)
	code: string;

	/**
	 * The new password for the user.
	 * Must be a string between 8 and 24 characters and match the specified password pattern.
	 */
	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(8, 24)
	@Matches(PASSWORD_PATTERN, { message: 'Invalid password format' })
	password: string;
}
