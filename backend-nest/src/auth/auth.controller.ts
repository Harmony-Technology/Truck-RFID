import { Controller, Request, Post, Get,UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  
  @Get('countUser')
  async countUser(){
    const countUser = await this.authService.countUser()
    return {
      count_user: countUser.total_input,
  }
}
}