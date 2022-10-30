export enum AppErrors {
	notFoundError = 'notFoundError',
	validationError = 'validationError',
}

export abstract class AppError extends Error {
	abstract name: AppErrors;
}
