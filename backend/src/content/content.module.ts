import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { ContentService } from "./content.service";
import { UserModule } from "../user/user.module";

@Module({
    imports: [PrismaModule, UserModule],
    providers: [ContentService],
    exports: [ContentService]
})
export class ContentModule { }
