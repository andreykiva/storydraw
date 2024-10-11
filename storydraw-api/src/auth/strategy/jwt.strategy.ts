import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { USERS_SERVICE } from 'src/common/constants/providers.constants';
import { UsersServiceInterface } from 'src/users/users.service.interface';
import { USER_NOT_FOUND_ERROR } from 'src/common/constants/errors.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		@Inject(USERS_SERVICE) private readonly usersService: UsersServiceInterface,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
		});
	}

	async validate(payload: any) {
		const user = await this.usersService.findOneById(payload.sub);

		if (!user) {
			throw new UnauthorizedException({ user: USER_NOT_FOUND_ERROR });
		}

		return user;
	}
}
