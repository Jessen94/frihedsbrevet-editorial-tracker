import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, ContentModule, UserModule],
  controllers: [AppController],
})

export class AppModule { }
