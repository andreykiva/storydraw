import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { TOKEN_VERIFICATION_ERROR } from 'src/common/constants/errors.constants';

/**
 * WebSocket JWT Authentication Guard.
 * Implements CanActivate to check if the incoming WebSocket connection
 * has a valid JWT token for authentication.
 */
@Injectable()
export class WsJwtAuthGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	/**
	 * Validates the incoming WebSocket connection based on JWT token.
	 *
	 * @param context - The execution context which contains information about
	 *                  the current request and connection.
	 * @returns A Promise that resolves to a boolean indicating whether the
	 *          request is authorized (true) or not (false).
	 * @throws UnauthorizedException if the token is invalid or verification fails.
	 */
	async canActivate(context: ExecutionContext): Promise<boolean> {
		// Create a GraphQL execution context from the NestJS execution context
		const ctx = GqlExecutionContext.create(context);
		// Extract the JWT token from the WebSocket connection parameters
		const token = ctx.getContext().req.connectionParams.token;

		// If no token is provided, deny access
		if (!token) {
			return false;
		}

		try {
			// Verify the token using the JWT service
			const decoded = await this.jwtService.verify(token, {
				secret: this.configService.get('ACCESS_TOKEN_SECRET'),
			});

			// Attach the user ID to the request context for future use
			ctx.getContext().req.user = {
				id: decoded.sub,
			};

			// Allow access if token verification was successful
			return true;
		} catch (err) {
			// Throw an UnauthorizedException if token verification fails
			throw new UnauthorizedException(TOKEN_VERIFICATION_ERROR);
		}
	}
}
