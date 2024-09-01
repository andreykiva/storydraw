import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/services/users.service';
import { USER_NOT_FOUND_ERROR } from 'src/common/constants/errors.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private configService: ConfigService,
		private usersService: UsersService,
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
