import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsPhoneNumber, IsString, Length, Matches } from 'class-validator';
import { PASSWORD_PATTERN, USERNAME_PATTERN } from 'src/common/constants/regexp.constants';

/**
 * Input DTO for logging in with a phone number and a verification code.
 */
@InputType()
export class LoginWithPhoneAndCodeInput {
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
}

/**
 * Input DTO for logging in with a phone number and a password.
 */
@InputType()
export class LoginWithPhoneAndPassInput {
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
	 * The password of the user.
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
 * Input DTO for logging in with an email and a password.
 */
@InputType()
export class LoginWithEmailAndPassInput {
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
	 * The password of the user.
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
 * Input DTO for logging in with a username and a password.
 */
@InputType()
export class LoginWithUsernameAndPassInput {
	/**
	 * The username of the user.
	 * Must be a string between 5 and 24 characters and match the specified username pattern.
	 */
	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(5, 24)
	@Matches(USERNAME_PATTERN, { message: 'Invalid username format' })
	username: string;

	/**
	 * The password of the user.
	 * Must be a string between 8 and 24 characters and match the specified password pattern.
	 */
	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(8, 24)
	@Matches(PASSWORD_PATTERN, { message: 'Invalid password format' })
	password: string;
}
