import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { USERNAME_PATTERN } from 'src/common/constants/regexp.constants';

@InputType()
export class FindOneByUsernameInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(5, 24)
	@Matches(USERNAME_PATTERN, { message: 'Invalid username format' })
	username: string;
}
