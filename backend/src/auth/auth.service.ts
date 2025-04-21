import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    async login(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email)
        if (!user || user.password !== password) {
            throw new UnauthorizedException('Invalid credentials')
        }

        return user
    }
}


