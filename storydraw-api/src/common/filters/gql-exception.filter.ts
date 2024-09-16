import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-errors';

@Catch(HttpException)
export class GqlExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		// Проверка на GraphQL контекст
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

		throw new ApolloError(message || 'An unexpected error occurred', status.toString(), {
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request?.url || 'unknown',
			errors,
		});
	}
}
