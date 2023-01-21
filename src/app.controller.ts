import { Controller, Get, Param, Query, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Render('home')
  @Get()
  public index(@Query('name') name?: string) {
    return { name };
  }
  
  @Render('about')
  @Get('/about')
  public about() {
    return {};
  }
  @Render('login')
  @Get('/login')
  public login() {
    return {};
  }
  @Render('register')
  @Get('/register')
  public register() {
    return {};
  }
  @Render('channel')
  @Get('/workspaces/:workspace/channels/:channel')
  public channel(@Param('workspace') workspace: string, @Param('channel') channel: string) {
    return {workspace, channel};
  }
  @Render('channel')
  @Get('channel')
  public channel2(@Param('workspace') workspace: string, @Param('channel') channel: string) {
    return {workspace, channel};
  }
}

