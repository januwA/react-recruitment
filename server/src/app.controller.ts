import { Get, Controller, Response } from '@nestjs/common';
import { AppService } from './app.service';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Response() res) {
    res.sendFile(path.resolve(__dirname, '..', 'view', 'index.html'));
    // return this.appService.root();
  }
}
