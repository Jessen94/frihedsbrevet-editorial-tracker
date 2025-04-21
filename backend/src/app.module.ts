import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [AuthModule, ContentModule],
  controllers: [AppController],
})

export class AppModule { }
