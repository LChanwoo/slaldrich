import fs from 'fs';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { LoggedInGuard } from '../common/guards/logged-in.guard';
import { ChannelsService } from './channels.service';
import { User } from '../common/decorators/user.decorator';
import Users from '../entities/Users';
import { CreateChannelDto } from './dto/create-channel.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import path from 'path';
import multer from 'multer';

try {
    fs.readdirSync('uploads');
  } catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
  
@UseGuards(LoggedInGuard)
@Controller('api/workspaces')
export class ChannelsController {
    constructor(private channelsService: ChannelsService) {}

    @Get(':url/channels')
    async getWorkspaceChannels(@Param('url') url, @User() user: Users) {
      console.log("channel임")
      console.log(user.id)
      console.log(url)
      return this.channelsService.getWorkspaceChannels(url, user.id);
    }
    @Get(':url/channels/:name')
    async getWorkspaceChannel(@Param('url') url, @Param('name') name) {
        return this.channelsService.getWorkspaceChannel(url, name);
    }
    @Post(':url/channels')
    async createWorkspaceChannels(
      @Param('url') url,
      @Body() body: CreateChannelDto,
      @User() user: Users,
    ) {
      return this.channelsService.createWorkspaceChannels(
        url,
        body.name,
        user.id,
      );
    }

    @Get(':url/channels/:name/members')
    async getWorkspaceChannelMembers(
      @Param('url') url: string,
      @Param('name') name: string,
    ) {
      return this.channelsService.getWorkspaceChannelMembers(url, name);
    }

    @Post(':url/channels/:name/members')
    async createWorkspaceMembers(
      @Param('url') url: string,
      @Param('name') name: string,
      @Body('email') email,
    ) {
      return this.channelsService.createWorkspaceChannelMembers(url, name, email);
    }

    @Get(':url/channels/:name/chats')
    async getWorkspaceChannelChats(
      @Param('url') url,
      @Param('name') name,
      @Query('perPage', ParseIntPipe) perPage: number,
      @Query('page', ParseIntPipe) page: number,
    ) {
      return this.channelsService.getWorkspaceChannelChats(
        url,
        name,
        perPage,
        page,
      );
    }

    @Post(':url/channels/:name/chats')
    async createWorkspaceChannelChats(
      @Param('url') url,
      @Param('name') name,
      @Body('content') content,
      @User() user: Users,
    ) {
      return this.channelsService.createWorkspaceChannelChats(
        url,
        name,
        content,
        user.id,
      );
    }
    @UseInterceptors(
        FilesInterceptor('image', 10, {
          storage: multer.diskStorage({
            destination(req, file, cb) {
              cb(null, 'public/uploads/');
            },
            filename(req, file, cb) {
              const ext = path.extname(file.originalname);
              cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
            },
          }),
          limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
        }),
    )
    @Post(':url/channels/:name/images')
    async createWorkspaceChannelImages(
      @Param('url') url,
      @Param('name') name,
      @UploadedFiles() files: Express.Multer.File[],
      @User() user: Users,
    ) {
      return this.channelsService.createWorkspaceChannelImages(
        url,
        name,
        files,
        user.id,
      );
    }

    @Get(':url/channels/:name/unreads')
    async getUnreads(
        @Param('url') url,
        @Param('name') name,
        @Query('after', ParseIntPipe) after: number,
    ) {
      return this.channelsService.getChannelUnreadsCount(url, name, after);
    }
}

