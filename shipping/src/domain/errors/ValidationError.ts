import {AppError, AppErrors} from './AppError';

export class ValidationError extends AppError {
	name = AppErrors.validationError;
}
