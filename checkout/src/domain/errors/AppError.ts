export enum AppErrors {
	notFoundError = 'notFoundError',
	validationError = 'validationError',
	gatewayError = 'gatewayError',
	conflictError = 'conflictError',
}

export abstract class AppError extends Error {
	abstract name: AppErrors;
}
