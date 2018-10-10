import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import * as md5 from 'md5';

const l = console.log;
@Injectable()
export class UserService {
  constructor(@InjectModel('users') private readonly userModel: Model<User>) {}

  info() {
    return {
      code: 1,
    };
  }

  async register({ user, pwd, type }) {
    let r = await this.userModel.findOne({ user });
    if (r) {
      return {
        code: 1,
        msg: '用户名已存在',
      };
    }
    r = new this.userModel({ user, type, pwd: this._pwdMd5(pwd) });
    await r.save();
    return {
      code: 0,
      msg: 'ok',
    };
  }

  async login(res, { user, pwd }) {
    let r = await this.userModel.findOne(
      { user, pwd: this._pwdMd5(pwd) },
      { pwd: 0 },
    );
    if (r) {
      res.cookie('userid', r._id)
        .json({
        code: 0,
        data: r,
        msg: 'ok',
      });
    } else {
      res.json({
        code: 1,
        msg: '用户名或密码错误',
      });
    }
  }

  _pwdMd5(pwd) {
    return md5(md5(pwd + 'ajanuw827--~'));
  }
}
