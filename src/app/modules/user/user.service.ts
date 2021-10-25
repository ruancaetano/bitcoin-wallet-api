import bcrypt from 'bcrypt';
import { autoInjectable, injectable } from 'tsyringe';

import { DbConnection } from '../../database/connection';
import { passwordHashConfig } from '../../configs/password-hash.config';
import { HttpStatus } from '../../enums/http-status.enum';
import { HttpError } from '../../errors/http.error';
import { UserDto } from '../common/dtos/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
@injectable()
@autoInjectable()
export class UserService {

    constructor(private dbConnection: DbConnection){}

     getById = async (id: string): Promise<UserDto> => {
        const userRepository = this.dbConnection.connection.getCustomRepository(UserRepository);

        const foundUser = await userRepository.findOne(id)

        if(!foundUser) {
            throw new HttpError(
                HttpStatus.BAD_REQUEST,
                'User not found'
            );
        }

        return UserDto.fromEntity(foundUser);
    }

    getUserByEmailAndPassword = async (
        email: string,
        password: string
    ): Promise<UserDto> => {
        const userRepository = this.dbConnection.connection.getCustomRepository(UserRepository);

        const user = await userRepository.findOne({
            email: email,
        });

        if (!user) {
            throw new HttpError(
                HttpStatus.UNAUTHORIZED,
                'E-mail or password invalid!'
            );
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            throw new HttpError(
                HttpStatus.UNAUTHORIZED,
                'E-mail or password invalid!'
            );
        }

        return UserDto.fromEntity(user);
    };

    createUser = async (createUserDto: CreateUserDto): Promise<UserDto> => {
        const userRepository = this.dbConnection.connection.getCustomRepository(UserRepository);
        const { name, email, password } = createUserDto;

        const hashedPassword = await bcrypt.hash(
            password,
            Number(passwordHashConfig.saltRounds)
        );

        const newUserModel = userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        const newUser = await userRepository.save(newUserModel);

        return UserDto.fromEntity(newUser);
    };
}
