import { HttpStatus } from '../../../enums/http-status.enum';
import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';
import { DEFAULT_ERROR_MESSAGE } from '../../../constants/error-message.constant';

export const createTransactionValidator = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { body } = req;
        const schema = Yup.object({
            date: Yup.date().required(),
            unitValue: Yup.number().required(),
            quantity: Yup.number().required()
        });

        await schema.validate(body, { abortEarly: true });
        next();
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: error.errors[0],
            });
        }

        return res.status(HttpStatus.SERVER_ERROR).json({
            message: DEFAULT_ERROR_MESSAGE,
        });
    }
};
