import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  WebSocketServer,
} from '@nestjs/websockets';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable, of } from 'rxjs';

const l = console.log;
@WebSocketGateway()
export class EventsGateway {
  constructor(@InjectModel('chats') private readonly chatModel: Model<any>) {}

  @WebSocketServer()
  server;
  @SubscribeMessage('message')
  async onEvent(client, data) {
    // 获取消息数据 存在数据库里面
    // l(data);
    const { from, to, content, avatar } = data;
    const charid = [from, to].sort().join('_');
    let r = new this.chatModel({
      charid,
      from,
      to,
      content,
      avatar,
    });
    // l(r);
    await r.save();
    this.server.emit('resmsg', r);
  }
}
