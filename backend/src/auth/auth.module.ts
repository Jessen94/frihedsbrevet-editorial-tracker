import { UserModule } from "../user/user.module";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthService } from "./auth.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [PrismaModule, UserModule],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule { }

