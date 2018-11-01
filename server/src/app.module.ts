import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsGateway } from './events/events.gateway'

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
export class AppModule {}
