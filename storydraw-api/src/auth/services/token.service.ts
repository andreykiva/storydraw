import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/services/users.service';
import { TOKEN_VERIFICATION_ERROR, USER_NOT_FOUND_ERROR } from 'src/common/constants/errors.constants';

@Injectable()
export class TokenService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly usersService: UsersService,
	) {}

	generateAccessToken(payload: { sub: string }): string {
		return this.jwtService.sign(payload);
	}

	generateRefreshToken(payload: { sub: string }): string {
		return this.jwtService.sign(payload, {
			secret: this.configService.get('REFRESH_TOKEN_SECRET'),
			expiresIn: '7d',
		});
	}

	async verifyRefreshToken(token: string) {
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
