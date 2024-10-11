import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { USERS_SERVICE } from 'src/common/constants/providers.constants';
import { UsersServiceInterface } from 'src/users/users.service.interface';
import { TOKEN_VERIFICATION_ERROR, USER_NOT_FOUND_ERROR } from 'src/common/constants/errors.constants';
import { TokenServiceInterface } from '../interfaces/token.service.interface';

/**
 * Service for managing JWT tokens.
 * Handles the generation and verification of access and refresh tokens.
 */
@Injectable()
export class TokenService implements TokenServiceInterface {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		@Inject(USERS_SERVICE) private readonly usersService: UsersServiceInterface,
	) {}

	/**
	 * Generates an access token.
	 * @param payload - The payload containing user information. Must include a `sub` field.
	 * @returns A signed access token as a string.
	 */
	generateAccessToken(payload: { sub: string }): string {
		return this.jwtService.sign(payload);
	}

	/**
	 * Generates a refresh token.
	 * @param payload - The payload containing user information. Must include a `sub` field.
	 * @returns A signed refresh token as a string.
	 */
	generateRefreshToken(payload: { sub: string }): string {
		return this.jwtService.sign(payload, {
			secret: this.configService.get('REFRESH_TOKEN_SECRET'),
			expiresIn: '7d',
		});
	}

	/**
	 * Verifies a refresh token.
	 * @param token - The refresh token to be verified.
	 * @returns A promise that resolves with the decoded token containing the `sub` field.
	 * @throws {UnauthorizedException} If the token is invalid or the user is not found.
	 */
	async verifyRefreshToken(token: string): Promise<{ sub: string }> {
		try {
			const decoded = await this.jwtService.verify(token, {
				secret: this.configService.get('REFRESH_TOKEN_SECRET'),
			});

			const user = await this.usersService.findOneById(decoded.sub);

			if (!user) {
				throw new UnauthorizedException({ user: USER_NOT_FOUND_ERROR });
			}

			return { sub: decoded.sub };
		} catch {
			throw new UnauthorizedException(TOKEN_VERIFICATION_ERROR);
		}
	}
}
