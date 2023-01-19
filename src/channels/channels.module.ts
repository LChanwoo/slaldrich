import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelChats } from '../entities/ChannelChats';
import { Channelmembers } from '../entities/ChannelMembers';
import { Channels } from '../entities/Channels';
import Users from '../entities/Users';
import { Workspaces } from '../entities/Workspaces';
import { EventsModule } from '../events/events.module';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Channels,
      ChannelChats,
      Users,
      Workspaces,
      Channelmembers,
    ]),
    EventsModule,
  ],
  providers: [ChannelsService],
  controllers: [ChannelsController],
})
export class ChannelsModule {}
