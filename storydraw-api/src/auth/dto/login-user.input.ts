import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsPhoneNumber, IsString, Length, Matches } from 'class-validator';
import { passwordPattern, usernamePattern } from '../constants/regexp.constants';

@InputType()
export class LoginWithPhoneAndCodeInput {
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
}

@InputType()
export class LoginWithPhoneAndPassInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	@IsPhoneNumber()
	phone: string;

	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(8, 24)
	@Matches(passwordPattern, { message: 'Invalid password format' })
	password: string;
}

@InputType()
export class LoginWithEmailAndPassInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(8, 24)
	@Matches(passwordPattern, { message: 'Invalid password format' })
	password: string;
}

@InputType()
export class LoginWithUsernameAndPassInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(5, 24)
	@Matches(usernamePattern, { message: 'Invalid username format' })
	username: string;

	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(8, 24)
	@Matches(passwordPattern, { message: 'Invalid password format' })
	password: string;
}
