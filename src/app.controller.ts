import { Controller, Get, Param, Query, Redirect, Render } from '@nestjs/common';
import { User } from './common/decorators/user.decorator';
import Users from './entities/Users';

@Controller()
export class AppController {
  // @Render("SignUp")
  @Get()
  @Redirect('/login')
  public index(@Query('name') name?: string) {
    return { name };
  }
  @Render('Signup')
  @Get('/signup')
  public signup() {
    return {};
  }
  @Render('Login')
  @Get('/login')
  public login() {
    return {};
  }
  @Render('WorkspaceChannel')
  @Get('/workspace/:workspace/channel/:channel')
  public channel(@Param('workspace') workspace: string, @Param('channel') channel: string, @User() userData: Users) {
    console.log(workspace, channel,userData)
    return {workspace, channel,userData};
  }
  @Render('WorkspaceDM')
  @Get('/workspace/:workspace/dm/:id')
  public dm(@Param('workspace') workspace: string, @Param('id') id: string) {
    console.log(workspace, id)
    return {workspace, id};
  }
  // @Render('Workspace')
  // @Get('/workspace/:workspace/channel/:channel')
  // public channel(@Param('workspace') workspace: string, @Param('channel') channel: string) {
  //   console.log(workspace, channel)
  //   return {workspace, channel};
  // }
  // @Render('Channel')
  // @Get('channel')
  // public channel2(@Param('workspace') workspace: string, @Param('channel') channel: string) {
  //   return {workspace, channel};
  // }
  // @Render('Channel')
  // @Get('/workspace/:workspace/channel/:channel')
  // public channel2(@Param('workspace') workspace: string, @Param('channel') channel: string) {
  //   console.log(workspace, channel)
  //   return {workspace, channel};
  // }
}

