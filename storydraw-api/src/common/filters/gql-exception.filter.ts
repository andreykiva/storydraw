import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-errors';

@Catch(HttpException)
export class GqlExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const gqlHost = GqlArgumentsHost.create(host);
		const ctx = gqlHost.getContext();
		const request = ctx.req;

		const status = exception.getStatus();
		const message = exception.message;

		let errors = exception.getResponse() as Record<string, any>;

		if (typeof errors === 'string') {
			errors = { message: errors };
		}

		throw new ApolloError(message, status.toString(), {
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request?.url,
			errors,
		});
	}
}
