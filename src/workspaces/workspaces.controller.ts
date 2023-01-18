import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { User } from '../common/decorators/user.decorator';
import Users from '../entities/Users';
import { CreateWorkspaceDto } from './dto/create-workspaces.dto';
import { WorkspacesService } from './workspaces.service';

@Controller('api/workspaces')
export class WorkspacesController {
    
    constructor(private workspacesService: WorkspacesService) {}
    
    @Get()
    async getMyWorkspaces(@User() user: Users) {
         return this.workspacesService.findMyWorkspaces(user.id);
    }
    @Post()
    async createWorkspace(@User() user: Users, @Body() body: CreateWorkspaceDto) {
        const { workspace, url } = body;
        const { id } = user;   
        return this.workspacesService.createWorkspace(
            workspace,
            url,
            id,
        );
    }
    @Get(':url/members')
    async getWorkspaceMembers(@Param('url') url: string) {
      return this.workspacesService.getWorkspaceMembers(url);
    }

    @Post(':url/members')
    async createWorkspaceMembers(
        @Param('url') url: string,
        @Body('email') email : string,
    ) {
        return this.workspacesService.createWorkspaceMembers(url, email);
    }

    @Get(':url/members/:id')
    async getWorkspaceMember(
      @Param('url') url: string,
      @Param('id', ParseIntPipe) id: number,
    ) {
      return this.workspacesService.getWorkspaceMember(url, id);
    }

}
