export enum AppErrors {
	notFoundError = 'notFoundError',
	validationError = 'validationError',
	gatewayError = 'gatewayError',
	conflictError = 'conflictError',
	expiredError = 'expiredError',
}

export abstract class AppError extends Error {
	abstract name: AppErrors;
}
