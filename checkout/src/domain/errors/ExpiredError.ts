import {AppError, AppErrors} from './AppError';

export class ExpiredError extends AppError {
	name: AppErrors = AppErrors.expiredError;
}
