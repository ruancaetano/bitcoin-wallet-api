import jwt from 'jsonwebtoken';
import { autoInjectable, injectable } from 'tsyringe';

import { jwtConfig } from '../../configs/jwt.config';
import { UserDto } from '../common/dtos/user.dto';
import { UserService } from '../user/user.service';
import { SigninBodyDto } from './dtos/signin-body.dto';
import { SignInResponseDto } from './dtos/signin-response.dto';
import { SignupBodyDto } from './dtos/signup-body.dto';

@injectable()
@autoInjectable()
export class AuthService {

    constructor(private userService: UserService){}

    async signUp(body: SignupBodyDto): Promise<UserDto> {
        return this.userService.createUser(body);
    }

    async signIn(body: SigninBodyDto): Promise<SignInResponseDto> {
        const user = await this.userService.getUserByEmailAndPassword(
            body.email,
            body.password
        );

        const token = jwt.sign(
            {
                userId: user.id,
            },
            jwtConfig.secret as string
        );

        return {
            token,
            user,
        };
    }
}
