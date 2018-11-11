import {
  Controller,
  Get,
  Post,
  Body,
  Response,
  Request,
  UseInterceptors,
  FileFieldsInterceptor,
  FileInterceptor,
  UploadedFile,
  Query,
} from '@nestjs/common';
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
    return this.userService.login(res, body);
  }

  @Post('update')
  @UseInterceptors(FileInterceptor('avatar'))
  update(
    @UploadedFile() avatarBf,
    @Body() body,
    @Request() req,
    @Response() res,
  ) {
    // {fieldname, originalname, mimetype, buffer}avatarBr
    return this.userService.update(req, res, avatarBf, body);
  }

  @Get('list')
  list(@Query() query) {
    return this.userService.list(query);
  }

  @Get('getMsgList')
  getMsgList(@Request() req, @Response() res) {
    return this.userService.getMsgList(req, res);
  }

  @Post('readmsg')
  readmsg(@Request() req, @Response() res) {
    return this.userService.readmsg(req, res);
  }
}
