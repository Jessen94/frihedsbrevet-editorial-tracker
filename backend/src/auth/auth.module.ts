import { PrismaModule } from "../prisma/prisma.module";
import { AuthService } from "./auth.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [PrismaModule],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule { }

