import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../user/user.service";
import { Role } from "@prisma/client";

@Injectable()
export class ContentService {
    constructor(private readonly prisma: PrismaService, private readonly userService: UserService) { }

    async getContent(userId: string) {
        const user = await this.userService.getUser(userId)

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const isEditor = user.role === Role.EDITOR

        return this.prisma.contentItem.findMany({
            where: {
                ...(isEditor ? {} : { authors: { some: { id: userId } } })
            }
        })
    }
}


