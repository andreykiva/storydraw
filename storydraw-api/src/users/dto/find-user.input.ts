import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { usernamePattern } from 'src/auth/constants/regexp.constants';

@InputType()
export class FindOneByUsernameInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(5, 24)
	@Matches(usernamePattern, { message: 'Invalid username format' })
	username: string;
}
