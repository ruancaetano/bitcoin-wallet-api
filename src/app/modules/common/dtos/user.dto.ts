import { User } from '../../user/user.entity';

export class UserDto {
    id: string;
    name: string;
    email: string;

    static fromEntity(user: User) {
        const userDto = new UserDto();

        userDto.id = user.id;
        userDto.name = user.name;
        userDto.email = user.email;

        return userDto;
    }
}
