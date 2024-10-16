import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerGuard } from '@nestjs/throttler';

/**
 * GraphQL Throttler Guard.
 * Extends the ThrottlerGuard to provide rate limiting for GraphQL requests.
 */
@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
	/**
	 * Retrieves the request and response objects from the GraphQL context.
	 *
	 * @param context - The execution context containing the current request.
	 * @returns An object containing the `req` and `res` objects for the current request.
	 */
	getRequestResponse(context: ExecutionContext) {
		// Create a GraphQL execution context from the NestJS execution context
		const gqlCtx = GqlExecutionContext.create(context);

		// Extract the request and response from the GraphQL context
		const ctx = gqlCtx.getContext();
		return { req: ctx.req, res: ctx.res };
	}

	/**
	 * Determines whether the current request is allowed based on throttling rules.
	 *
	 * @param context - The execution context containing the current request.
	 * @returns A promise that resolves to a boolean indicating whether
	 * the request is allowed (true) or denied (false) based on throttling rules.
	 */
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const { req, res } = this.getRequestResponse(context);

		// Check for the existence of req and res
		if (!req || !res) {
			// Simply skip throttling check
			return true;
		}

		// Continue with the standard throttling logic
		return super.canActivate(context);
	}
}
