import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

import { HttpStatus } from '../../enums/http-status.enum';

import { AuthService } from './auth.service';

@autoInjectable()
export class AuthController {
    constructor(private authService: AuthService) {}

    signUp = async (req: Request, res: Response) => {
        const user = await this.authService.signUp(req.body);
        return res.status(HttpStatus.CREATED).json(user);
    };

    signIn = async (req: Request, res: Response) => {
        const signInResponse = await this.authService.signIn(req.body);
        return res.status(HttpStatus.OK).json(signInResponse);
    };
}
