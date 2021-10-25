import { HttpStatus } from "../enums/http-status.enum";

export class HttpError extends Error {
    status: HttpStatus
    message: string;

    constructor(status:HttpStatus, message:string) {
        super(message)
        this.status = status
        this.message = message
    }
}
