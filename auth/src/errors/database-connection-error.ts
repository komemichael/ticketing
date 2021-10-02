import { CustomError } from './custom-error'

export class DatabaseConnectionError extends CustomError {
    reason = 'Error connecting to database';
    status_code = 500;

    constructor(){
        super('Error connecting to database');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors(){
        return [
            {
                message: this.reason
            }
        ]
    }
}