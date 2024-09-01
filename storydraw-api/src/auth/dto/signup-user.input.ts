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

@InputType()
export class SignupWithPhoneAndCodeInput {
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

	@Field({ nullable: true })
	@IsOptional()
	@IsDate()
	dateOfBirth?: Date;
}

@InputType()
export class SignupWithEmailAndPassAndCodeInput {
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

	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(6)
	code: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsDate()
	dateOfBirth?: Date;

	@Field({ nullable: true })
	@IsOptional()
	@IsBoolean()
	receiveEmailUpdates?: boolean;
}
