import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { ChatSchema } from './schemas/chat.schema'

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'users', schema: UserSchema },
    { name: 'chats', schema: ChatSchema },
  ])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
