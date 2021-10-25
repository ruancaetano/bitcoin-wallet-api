import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthController } from './auth.controller';
import { signInValidator } from './validators/signin.validator';
import { signUpValidator } from './validators/signup.validator';

const authRoutes = Router();

const controller = container.resolve(AuthController)

authRoutes.post('/signup', signUpValidator, controller.signUp);
authRoutes.post('/signin', signInValidator, controller.signIn);

export { authRoutes };
