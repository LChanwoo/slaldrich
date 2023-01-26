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
  @Render('WorkspaceChannel/WorkspaceChannel')
  @Get('/workspace/:workspace/channel/:channel')
  public channel(@Param('workspace') workspace: string, @Param('channel') channel: string, @User() user) {
    console.log(workspace, channel,user)
    console.log("여기에요 여기")
    user = JSON.stringify(user);
    console.log(user)
    return {workspace, channel, user};
  }
  @Render('WorkspaceDM')
  @Get('/workspace/:workspace/dm/:id')
  public dm(@Param('workspace') workspace: string, @Param('id') id: string, @User() user) {
    console.log(workspace, id)
    user = JSON.stringify(user);
    return {workspace, id, user};
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

