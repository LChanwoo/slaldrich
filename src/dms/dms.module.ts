import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dms } from '../entities/Dms';
import  Users  from '../entities/Users';
import { Workspaces } from '../entities/Workspaces';
import { DmsService } from './dms.service';
import { EventsModule } from '../events/events.module';
import { DmsController } from './dms.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Dms, Users, Workspaces]), EventsModule],
  controllers: [DmsController],
  providers: [DmsService],
})
export class DmsModule {}
