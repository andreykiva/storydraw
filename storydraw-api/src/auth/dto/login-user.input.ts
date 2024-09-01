import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsPhoneNumber, IsString, Length, Matches } from 'class-validator';
import { PASSWORD_PATTERN, USERNAME_PATTERN } from 'src/common/constants/regexp.constants';

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
	@Matches(PASSWORD_PATTERN, { message: 'Invalid password format' })
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
	@Matches(PASSWORD_PATTERN, { message: 'Invalid password format' })
	password: string;
}

@InputType()
export class LoginWithUsernameAndPassInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(5, 24)
	@Matches(USERNAME_PATTERN, { message: 'Invalid username format' })
	username: string;

	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(8, 24)
	@Matches(PASSWORD_PATTERN, { message: 'Invalid password format' })
	password: string;
}
