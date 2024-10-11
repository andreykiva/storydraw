import { Field, InputType } from '@nestjs/graphql';
import {
	IsDate,
	IsEmail,
	IsPhoneNumber,
	IsString,
	Length,
	Matches,
	IsBoolean,
	IsOptional,
	IsNotEmpty,
} from 'class-validator';
import { PASSWORD_PATTERN } from 'src/common/constants/regexp.constants';

/**
 * Input DTO for signing up with a phone number and a verification code.
 */
@InputType()
export class SignupWithPhoneAndCodeInput {
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
	 * The user's date of birth.
	 * Optional field; must be a valid date if provided.
	 */
	@Field({ nullable: true })
	@IsOptional()
	@IsDate()
	dateOfBirth?: Date;
}

/**
 * Input DTO for signing up with an email address, password, and a verification code.
 */
@InputType()
export class SignupWithEmailAndPassAndCodeInput {
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

	/**
	 * The verification code sent to the user's email.
	 * Must be a string with exactly 6 characters.
	 */
	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(6)
	code: string;

	/**
	 * The user's date of birth.
	 * Optional field; must be a valid date if provided.
	 */
	@Field({ nullable: true })
	@IsOptional()
	@IsDate()
	dateOfBirth?: Date;

	/**
	 * Indicates whether the user wants to receive email updates.
	 * Optional field; default is `false`.
	 */
	@Field({ nullable: true })
	@IsOptional()
	@IsBoolean()
	receiveEmailUpdates?: boolean;
}
