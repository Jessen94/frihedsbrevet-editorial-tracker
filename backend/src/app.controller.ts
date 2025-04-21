import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() body: { email: string, password: string }) {
    return this.authService.login(body.email, body.password)
  }
}
