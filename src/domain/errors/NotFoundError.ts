import {AppError, AppErrors} from './AppError';

export class NotFoundError extends AppError {
	name = AppErrors.notFoundError;
}
