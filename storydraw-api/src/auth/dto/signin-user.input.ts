import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsPhoneNumber, IsString, Length, Matches } from 'class-validator';
import { passwordPattern } from '../constants/regexp.constants';

@InputType()
export class SigninWithPhoneAndCodeInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	@IsPhoneNumber()
	phoneNumber: string;

	@Field()
	@IsNotEmpty()
	@IsString()
	@Length(6)
	code: string;
}

@InputType()
export class SigninWithPhoneAndPassInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	@IsPhoneNumber()
	phoneNumber: string;

	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(8, 24)
	@Matches(passwordPattern)
	password: string;
}

@InputType()
export class SigninWithEmailAndPassInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(8, 24)
	@Matches(passwordPattern)
	password: string;
}

@InputType()
export class SigninWithUsernameAndPassInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(5, 24)
	username: string;

	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(8, 24)
	@Matches(passwordPattern)
	password: string;
}
