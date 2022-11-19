import {AppError, AppErrors} from './AppError';

export class ConflictError extends AppError {
	name = AppErrors.conflictError;
}
