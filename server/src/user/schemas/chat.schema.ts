import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  // 每条消息唯一的id
  chatid: {
    type: String,
    require: true,
  },
  // 谁发的
  from: {
    type: String,
    require: true,
  },
  // 谁发的身份 求职者jobSeeker， 商户enterprise
  from_type: {
    type: String,
    require: true,
  },
  // 发给谁的
  to: {
    type: String,
    require: true,
  },
  // 对于to来讲是否已经读取消息
  read: {
    type: Boolean,
    default: false,
  },
  // 内容
  content: {
    type: String,
    require: true,
    default: '',
  },
  // 头像
  avatar: {
    type: String,
  },
  // 创建的时间
  create_time: {
    type: Number,
    default: new Date().getTime(),
  },
});
