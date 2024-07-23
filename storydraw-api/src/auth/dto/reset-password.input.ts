import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber, IsString, Length, Matches, IsNotEmpty } from 'class-validator';
import { passwordPattern } from '../constants/regexp.constants';

@InputType()
export class ResetWithPhoneInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	@IsPhoneNumber()
	phone: string;

	@Field()
	@IsNotEmpty()
	@IsString()
	@Length(6)
	code: string;

	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(8, 24)
	@Matches(passwordPattern, { message: 'Invalid password format' })
	password: string;
}

@InputType()
export class ResetWithEmailInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@Field()
	@IsNotEmpty()
	@IsString()
	@Length(6)
	code: string;

	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(8, 24)
	@Matches(passwordPattern, { message: 'Invalid password format' })
	password: string;
}
