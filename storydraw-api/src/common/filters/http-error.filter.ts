import { Catch, ExceptionFilter, HttpException, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Custom exception filter for handling HTTP exceptions.
 * This filter intercepts HTTP exceptions and formats the response
 * to include relevant information such as status code, timestamp,
 * request path, and error message.
 */
@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
	/**
	 * Catches an HTTP exception and formats the response.
	 *
	 * @param exception - The caught HttpException instance.
	 * @param host - The ArgumentsHost containing the context of the request/response cycle.
	 */
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();

		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			message: exception.message,
		});
	}
}
