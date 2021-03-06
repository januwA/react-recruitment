import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import * as md5 from 'md5';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as os from 'os';

const l = console.log;
const _filter = { pwd: 0, __v: 0 };

@Injectable()
export class UserService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<User>,
    @InjectModel('chats') private readonly chatModel: Model<any>,
  ) {}

  async info(req) {
    const { userid } = req.cookies;
    if (!userid) {
      return {
        code: 1,
        msg: '',
      };
    }
    try {
      let r = await this.userModel.findOne({ _id: userid }, _filter);
      return {
        code: 0,
        data: r,
        msg: 'ok',
      };
    } catch (error) {
      return {
        code: 1,
        msg: String(error),
      };
    }
  }

  /**
   * 用户注册
   * @param res
   * @param param1
   */
  async register(res, { user, pwd, type }) {
    let r = await this.userModel.findOne({ user });
    if (r) {
      res.json({
        code: 1,
        msg: '用户名已存在',
      });
    }
    r = new this.userModel({ user, type, pwd: this._pwdMd5(pwd) });
    await r.save();
    {
      const { user, type, _id } = r;
      res.cookie('userid', _id).json({
        code: 0,
        data: { user, type, _id },
        msg: 'ok',
      });
    }
  }

  /**
   * 用户登陆
   * @param res
   * @param param1
   */
  async login(res, { user, pwd }) {
    let r = await this.userModel.findOne(
      { user, pwd: this._pwdMd5(pwd) },
      _filter,
    );
    if (r) {
      res.cookie('userid', r._id).json({
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

  /**
   * 资料完善
   * @param req
   * @param res
   * @param avatarBf
   * @param body
   */
  async update(req, res, avatarBf, body) {
    let userid = req.cookies.userid;
    if (!userid) return res.json({ code: 1 });

    let fileName = Date.now() + '_' + avatarBf.originalname;
    const savePath = path.join(__dirname, '..', '..', 'uploads', fileName);
    // 保存头像
    // await fs.outputFile(savePath, avatarBf.buffer);
    fs.outputFile(savePath, avatarBf.buffer);
    const showPath = `/static/${fileName}`;
    body.avatar = showPath;

    let r = await this.userModel.updateOne(
      {
        _id: userid,
      },
      body,
    );

    // 更新成功，返回新数据
    if (r.ok) {
      let r = await this.userModel.findOne({ _id: userid }, _filter);
      return res.json({
        code: 0,
        data: r,
      });
    } else {
      return res.json({
        code: 1,
      });
    }
  }

  async list(query) {
    let { type } = query;
    // 获取type相等，并且上传了头像的用户
    let r = await this.userModel.find(
      {
        type,
        avatar: {
          $ne: null,
        },
      },
      _filter,
    );
    return {
      code: 0,
      data: r,
    };
  }

  /**
   * * 获取所有的消息列表
   * @param req
   * @param res
   */
  async getMsgList(req, res) {
    const _id = req.cookies.userid;
    let userData = await this.userModel.find({});
    const users = {};
    userData.forEach(el => {
      users[el._id] = { name: el.user, avatar: el.avatar };
    });
    let r = await this.chatModel.find({
      $or: [
        {
          from: _id,
        },
        { to: _id },
      ],
    });
    res.json({
      code: 0,
      data: {
        msgs: r,
        users,
      },
    });
  }

  // 更新消息的read状态
  async readmsg(req, res) {
    const userid = req.cookies.userid;
    const { from } = req.body;
    const where = { from, to: userid };
    let r = await this.chatModel.updateMany(where, {
      $set: { read: true },
    });
    // 返回影响的行数
    res.json({ code: 0, data: r.nModified });
  }
  _pwdMd5(pwd) {
    return md5(md5(pwd + 'ajanuw827--~'));
  }
}
