import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  user: { type: String, require: true, unique: true }, // 账户
  pwd: { type: String, require: true }, // 密码
  type: { type: String, require: true }, // 企业或求职者
  avatar: { type: String }, // 头像
  desc: { type: String }, // 个人简介
  title: { type: String }, // 职位简介

  // 企业多两个字段
  company: { ttype: String }, // 公司
  money: { ttype: String }, // 钱
});
