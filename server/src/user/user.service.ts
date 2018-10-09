import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  info(){
    return {
      code: 1
    }
  }
}
