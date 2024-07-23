import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class AuthResponse {
	@Field()
	access_token: string;

	@Field()
	refresh_token: string;

	@Field(() => User)
	user: User;
}

@ObjectType()
export class RefreshTokenResponse {
	@Field()
	access_token: string;
}
