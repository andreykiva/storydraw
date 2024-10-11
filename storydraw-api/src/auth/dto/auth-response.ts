import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

/**
 * Response DTO for authentication, providing access and refresh tokens along with user information.
 */
@ObjectType()
export class AuthResponse {
	/**
	 * JWT access token for the authenticated user, used for authorizing requests.
	 */
	@Field()
	access_token: string;

	/**
	 * JWT refresh token for obtaining a new access token when the current one expires.
	 */
	@Field()
	refresh_token: string;

	/**
	 * User information associated with the authenticated session.
	 */
	@Field(() => User)
	user: User;
}

/**
 * Response DTO for refreshing an access token.
 */
@ObjectType()
export class RefreshTokenResponse {
	/**
	 * New JWT access token for the authenticated user.
	 */
	@Field()
	access_token: string;
}
