import {AppError, AppErrors} from './AppError';

export class GatewayError extends AppError {
	name = AppErrors.gatewayError;
}
