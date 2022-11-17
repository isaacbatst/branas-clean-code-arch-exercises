import type {AppErrors} from '../../domain/errors/AppError';
import {AppError} from '../../domain/errors/AppError';

export class ErrorMiddleware {
	static errorToStatusCode: Record<AppErrors, number> = {
		notFoundError: 404,
		validationError: 400,
		gatewayError: 502,
	};

	static handle(error: unknown) {
		if (error instanceof AppError) {
			return {
				statusCode: ErrorMiddleware.errorToStatusCode[error.name],
				body: {
					message: error.message,
				},
			};
		}

		console.log(error);

		return {
			statusCode: 500,
		};
	}
}
