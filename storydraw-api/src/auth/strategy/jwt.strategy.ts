import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/services/users.service';
import { USER_NOT_FOUND_ERROR } from 'src/common/constants/errors.constants';

/**
 * JWT authentication strategy for Passport.
 * This strategy validates JWT tokens and retrieves user information from the payload.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		private readonly usersService: UsersService,
	) {
		super({
			// Extract JWT from Authorization header as Bearer token
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false, // Do not ignore token expiration
			secretOrKey: configService.get('ACCESS_TOKEN_SECRET'), // Secret key for validating the JWT
		});
	}

	/**
	 * Validates the payload from the JWT token.
	 *
	 * @param payload - The decoded JWT payload containing user information.
	 * @throws UnauthorizedException - Throws an exception if the user is not found.
	 * @returns The user object if validation is successful.
	 */
	async validate(payload: any) {
		// Retrieve user from the database using the ID from the payload
		const user = await this.usersService.findOneById(payload.sub);

		if (!user) {
			// Throw unauthorized exception if user is not found
			throw new UnauthorizedException({ user: USER_NOT_FOUND_ERROR });
		}

		return user; // Return the user object if found
	}
}
