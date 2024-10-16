import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-errors';

/**
 * Custom exception filter for handling HTTP exceptions in GraphQL context.
 * This filter intercepts HTTP exceptions thrown in GraphQL resolvers
 * and formats the response to be compatible with Apollo Server's error structure.
 */
@Catch(HttpException)
export class GqlExceptionFilter implements ExceptionFilter {
	/**
	 * Catches an HTTP exception and throws an ApolloError.
	 *
	 * @param exception - The caught HttpException instance.
	 * @param host - The ArgumentsHost containing the context of the request/response cycle.
	 * @throws ApolloError - Throws an ApolloError with formatted message and additional details.
	 */
	catch(exception: HttpException, host: ArgumentsHost) {
		// Check for GraphQL context
		const gqlHost = GqlArgumentsHost.create(host);
		const info = gqlHost.getInfo();
		if (!info) {
			return;
		}

		const ctx = gqlHost.getContext();
		const request = ctx?.req;

		const status = exception.getStatus();
		let message = exception.message;

		let errors = exception.getResponse() as Record<string, any>;

		if (typeof errors === 'string') {
			errors = { message: errors };
		}

		if (!message && typeof errors === 'object' && errors['message']) {
			message = errors['message'];
		}

		// Throw ApolloError with formatted message and additional details
		throw new ApolloError(message || 'An unexpected error occurred', status.toString(), {
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request?.url || 'unknown',
			errors,
		});
	}
}
