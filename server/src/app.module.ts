import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsGateway } from './events/events.gateway';
import * as path from 'path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/react_recruitment', {
      useCreateIndex: true,
      useNewUrlParser: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        console.log(req.url);
        if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
          return next();
        } else {
          res.sendFile(path.resolve(__dirname, '..', 'view', 'index.html'));
        }
      })
      .forRoutes({
        path: '*',
        method: RequestMethod.GET,
      });
  }
}
