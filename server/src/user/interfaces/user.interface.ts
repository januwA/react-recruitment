import { Document } from 'mongoose';

export interface User extends Document {
  readonly user: String; // 账户
  readonly pwd: String; // 密码
  readonly type: String; // 企业或求职者
  readonly avatar?: String; // 头像
  readonly desc?: String; // 个人简介
  readonly title?: String; // 职位简介

  // 企业多两个字段
  readonly company?: String; // 公司
  readonly money?: String; // 钱
}
