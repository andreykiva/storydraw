import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { TOKEN_VERIFICATION_ERROR } from 'src/common/constants/errors.constants';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const ctx = GqlExecutionContext.create(context);
		const token = ctx.getContext().req.connectionParams.token;

		if (!token) {
			return false;
		}

		try {
			const decoded = await this.jwtService.verify(token, {
				secret: this.configService.get('ACCESS_TOKEN_SECRET'),
			});

			ctx.getContext().req.user = {
				id: decoded.sub,
			};

			return true;
		} catch (err) {
			throw new UnauthorizedException(TOKEN_VERIFICATION_ERROR);
		}
	}
}
