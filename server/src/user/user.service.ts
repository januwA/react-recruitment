import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import * as md5 from 'md5';

const l = console.log;
const _filter = { pwd: 0, '__v': 0 }

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private readonly userModel: Model<User>) { }

  async info(req) {
    const { userid } = req.cookies
    if (!userid) {
      return {
        code: 1,
        msg: ''
      };
    }
    try {
      let r = await this.userModel.findOne({ _id: userid }, _filter)
      return {
        code: 0,
        data: r,
        msg: 'ok'
      }
    } catch (error) {
      return {
        code: 1,
        msg: String(error)
      }
    }

  }

  async register(res, { user, pwd, type }) {
    let r = await this.userModel.findOne({ user });
    if (r) {
      res.json({
        code: 1,
        msg: '用户名已存在',
      })
    }
    r = new this.userModel({ user, type, pwd: this._pwdMd5(pwd) });
    await r.save();
    {
      const { user, type, _id } = r;
      res.cookie('userid', _id)
        .json({
          code: 0,
          data: {user, type, _id},
          msg: 'ok',
        });
    }

  }

  async login(res, { user, pwd }) {
    let r = await this.userModel.findOne(
      { user, pwd: this._pwdMd5(pwd) },
      _filter
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
