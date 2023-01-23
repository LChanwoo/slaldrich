import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { User } from '../common/decorators/user.decorator';
import { LoggedInGuard } from '../common/guards/logged-in.guard';
import Users from '../entities/Users';
import { DmsService } from './dms.service';

try {
    fs.readdirSync('uploads');
} catch (error) {
    // console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

@UseGuards(LoggedInGuard)
@Controller('api/workspaces')
export class DmsController {
    constructor(private dmsService: DmsService) {}

    @Get(':url/dms')
    async getWorkspaceChannels(@Param('url') url, @User() user: Users) {
        return this.dmsService.getWorkspaceDMs(url, user.id);
    }

    @Get(':url/dms/:id/chats')
    async getWorkspaceDMChats(
        @Param('url') url,
        @Param('id', ParseIntPipe) id: number,
        @Query('perPage', ParseIntPipe) perPage: number,
        @Query('page', ParseIntPipe) page: number,
        @User() user: Users,
    ) {
        return this.dmsService.getWorkspaceDMChats(url, id, user.id, perPage, page);
    }
    @Post(':url/dms/:id/chats')
    async createWorkspaceDMChats(
        @Param('url') url,
        @Param('id', ParseIntPipe) id: number,
        @Body('content') content,
        @User() user: Users,
    ) {
        return this.dmsService.createWorkspaceDMChats(url, content, id, user.id);
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
    @Post(':url/dms/:id/images')
    async createWorkspaceDMImages(
        @Param('url') url,
        @Param('id', ParseIntPipe) id: number,
        @UploadedFiles() files: Express.Multer.File[],
        @User() user: Users,
    ) {
        return this.dmsService.createWorkspaceDMImages(url, files, id, user.id);
    }
    @Get(':url/dms/:id/unreads')
    async getUnreads(
        @Param('url') url,
        @Param('id', ParseIntPipe) id: number,
        @Query('after', ParseIntPipe) after: number,
        @User() user: Users,
    ) {
        return this.dmsService.getDMUnreadsCount(url, id, user.id, after);
    }
}