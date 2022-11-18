export enum AppErrors {
	notFoundError = 'notFoundError',
	validationError = 'validationError',
	gatewayError = 'gatewayError',
}

export abstract class AppError extends Error {
	abstract name: AppErrors;
}
