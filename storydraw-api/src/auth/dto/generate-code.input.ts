import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsPhoneNumber, IsString } from 'class-validator';

@InputType()
export class GeneratePhoneCodeInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	@IsPhoneNumber()
	phone: string;
}

@InputType()
export class GenerateEmailCodeInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	email: string;
}
