import { CustomError } from './custom-error'

export class NotFoundError extends CustomError {
    status_code = 404;

    constructor(){
        super('Not Found');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors(){
        return [{message: 'Not found'}];
    }
}