import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, Length, Matches, MaxLength } from 'class-validator';
import { USERNAME_PATTERN } from 'src/common/constants/regexp.constants';

@InputType()
export class UpdateUserInput {
	@Field()
	@IsOptional()
	@IsString()
	@Length(5, 24)
	@Matches(USERNAME_PATTERN, { message: 'Invalid username format' })
	username: string;

	@Field()
	@IsOptional()
	@IsString()
	@Length(1, 30)
	displayName: string;

	@Field()
	@IsOptional()
	@IsString()
	@MaxLength(80)
	bio: string;
}

@InputType()
export class UpdateUsernameInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	@Length(5, 24)
	@Matches(USERNAME_PATTERN, { message: 'Invalid username format' })
	username: string;
}
