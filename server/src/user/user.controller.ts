import { Controller, Get, Post, Body, Response, Request } from '@nestjs/common';
import { UserService } from './user.service';

const l = console.log;
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  info(@Request() req) {
    return this.userService.info(req);
  }

  @Post('register')
  register(@Body() body, @Response() res) {
    return this.userService.register(res, body);
  }

  @Post('login')
  login(@Body() body, @Response() res) {
    return this.userService.login(res, body)
  }
}
