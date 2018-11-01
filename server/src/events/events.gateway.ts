import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  WebSocketServer,
} from '@nestjs/websockets';
import { Observable, of } from 'rxjs';

const l = console.log;
@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server;
  @SubscribeMessage('message')
  onEvent(client, data) {
    this.server.emit('resmsg', data);
  }
}
