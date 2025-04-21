import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async getUserById(userId: string) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            omit: {
                password: true
            }
        })
    }

    async getUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email: email },
        })
    }
}
