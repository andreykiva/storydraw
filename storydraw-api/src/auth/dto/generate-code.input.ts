import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsPhoneNumber, IsString } from 'class-validator';

/**
 * Input DTO for generating a verification code via phone.
 */
@InputType()
export class GeneratePhoneCodeInput {
	/**
	 * The phone number to which the verification code will be sent.
	 * @example "+1234567890"
	 */
	@Field()
	@IsString()
	@IsNotEmpty()
	@IsPhoneNumber()
	phone: string;
}

/**
 * Input DTO for generating a verification code via email.
 */
@InputType()
export class GenerateEmailCodeInput {
	/**
	 * The email address to which the verification code will be sent.
	 * @example "user@example.com"
	 */
	@Field()
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;
}
