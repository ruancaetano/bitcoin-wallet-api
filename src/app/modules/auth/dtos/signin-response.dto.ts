import { UserDto } from "../../../modules/common/dtos/user.dto";

export class SignInResponseDto {
    token: string;
    user: UserDto
}
