import { NextFunction, Request, Response } from 'express';

import { HttpError } from '../errors/http.error';
import { DEFAULT_ERROR_MESSAGE } from '../constants/error-message.constant';
import { HttpStatus } from '../enums/http-status.enum';

export const errorHandlerMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    if(error instanceof HttpError) {
        return res.status(error.status).json({
            message: error.message
        })
    }

    res.status(HttpStatus.SERVER_ERROR).json({
        message:
            process.env.NODE_ENV === 'development'
                ? error.message
                : DEFAULT_ERROR_MESSAGE,
    });
};
