import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channelmembers } from '../entities/ChannelMembers';
import { Channels } from '../entities/Channels';
import Users from '../entities/Users';
import { Workspacemembers } from '../entities/WorkspaceMembers';
import { Workspaces } from '../entities/Workspaces';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Channelmembers, Workspacemembers,Workspaces,Channels]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
