import {ValidationError} from 'express-validator';
import { CustomError } from './custom-error'

export class RequestValidationError extends CustomError {
    status_code = 400;

    constructor(public errors: ValidationError[]){
        super('Error validation');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors(){
        const formatted_errors = this.errors.map(error => {
            return {message: error.msg, field: error.param}
        });
        return formatted_errors;
    }
}