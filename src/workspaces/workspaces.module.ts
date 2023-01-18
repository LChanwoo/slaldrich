import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channelmembers } from '../entities/ChannelMembers';
import { Channels } from '../entities/Channels';
import Users from '../entities/Users';
import { Workspacemembers } from '../entities/WorkspaceMembers';
import { Workspaces } from '../entities/Workspaces';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Workspaces,
      Channels,
      Workspacemembers,
      Channelmembers,
    ]),
  ],
  controllers: [WorkspacesController],
  providers: [WorkspacesService]
})
export class WorkspacesModule {}
