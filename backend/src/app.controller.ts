import { Controller, Post, Body, Get, Headers, UnauthorizedException, Put } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { ContentService } from './content/content.service';
import { UserService } from './user/user.service';
import { Content } from './types';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly contentService: ContentService,
    private readonly userService: UserService
  ) { }

  @Post('login')
  login(@Body() body: { email: string, password: string }) {
    return this.authService.login(body.email, body.password)
  }

  @Get('content')
  async getContent(@Headers('x-userid') userId: string) {
    const user = await this.userService.getUserById(userId)

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    return this.contentService.getContent(user.id)
  }

  @Put('update-content')
  async updateContent(@Headers('x-userid') userId: string, @Body() content: Content) {
    const user = await this.userService.getUserById(userId)

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    return this.contentService.updateContent(user.id, content)
  }

  @Put('create-content')
  async createContent(@Headers('x-userid') userId: string, @Body() content: Content) {
    const user = await this.userService.getUserById(userId)

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    return this.contentService.createContent(user.id, content)
  }
}
