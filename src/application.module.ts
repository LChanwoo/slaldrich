import { Module, UseFilters } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import Users from './entities/Users';
import { ChannelChats } from './entities/ChannelChats';
import { Channels } from './entities/Channels';
import { Channelmembers } from './entities/ChannelMembers';
import { Dms } from './entities/Dms';
import { Mentions } from './entities/Mentions';
import { Workspacemembers } from './entities/WorkspaceMembers';
import { Workspaces } from './entities/Workspaces';
import { MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { EventsModule } from './events/events.module';
import { DmsModule } from './dms/dms.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

@UseFilters(new HttpExceptionFilter())
@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        conf: { useFilesystemPublicRoutes: false },
      }),
    ),
    // TypeOrmModule.forFeature([Users,ChannelChats,Channels,ChannelMembers,Dms,Mentions,WorkspaceMembers,Workspaces]),
    TypeOrmModule.forRoot({
      type:'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USER_ID,
      password: process.env.DB_USER_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Users,ChannelChats,Channels,Channelmembers,Dms,Mentions,Workspacemembers,Workspaces],
      // migrations: ['./migrations/*.js'],
      synchronize: true,
      autoLoadEntities: true,
      // dropSchema: true,
    }), 
    AuthModule, UsersModule, WorkspacesModule, ChannelsModule, EventsModule, DmsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
