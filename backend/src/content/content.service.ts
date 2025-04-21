import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserService } from "../user/user.service";
import { Role } from "@prisma/client";
import { Content } from "../types";

@Injectable()
export class ContentService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly userService: UserService
    ) { }

    async getContent(userId: string) {
        const user = await this.userService.getUserById(userId)

        const isEditor = user.role === Role.EDITOR

        return this.prisma.contentItem.findMany({
            where: {
                ...(isEditor ? {} : { authors: { some: { id: userId } } })
            },
            include: {
                authors: {
                    omit: {
                        password: true
                    }
                }
            }
        })
    }

    async createContent(userId: string, content: Content) {
        const user = await this.userService.getUserById(userId)

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return this.prisma.contentItem.create({
            data: {
                title: content.title,
                authors: { connect: content.authors.map(author => ({ id: author })) },
                status: content.status,
                type: content.type,
                deadline: content.deadline
            }
        })
    }

    async updateContent(userId: string, content: Content) {
        const user = await this.userService.getUserById(userId)

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return this.prisma.contentItem.update({
            where: { id: content.id },
            data: {
                title: content.title,
                authors: { connect: content.authors.map(author => ({ id: author })) },
                status: content.status,
                type: content.type
            }
        })
    }

}


