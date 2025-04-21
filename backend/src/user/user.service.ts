import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async getUserById(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        })

        return user
    }

    async getUserByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email: email }
        })

        return user
    }
}
