import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard for handling JWT authentication in GraphQL requests.
 * Extends the NestJS AuthGuard for JWT strategy.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	/**
	 * Overrides the default getRequest method to retrieve the request object
	 * from the GraphQL execution context.
	 *
	 * @param context - The execution context from which to extract the request.
	 * @returns The request object from the GraphQL context.
	 */
	getRequest(context: ExecutionContext) {
		// Create a GraphQL execution context and return the request object
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req; // Return the request object
	}
}
