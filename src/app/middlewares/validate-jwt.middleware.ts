import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { jwtConfig } from '../configs/jwt.config';
import { HttpStatus } from '../enums/http-status.enum';

export const validateJwtMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authorizationHeader = req.headers.authorization || '';

    const token = authorizationHeader.replace('Bearer ', '');

    if (!token || !jwt.verify(token, jwtConfig.secret as string)) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            message: 'You do not have permission to access this feature.',
        });
    }

    const decodedToken = jwt.decode(token) as JwtPayload;

    req.userId = decodedToken?.userId;

    next();
};
