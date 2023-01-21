import { Controller, Get, Param, Query, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Render('Login')
  @Get()
  public index(@Query('name') name?: string) {
    return { name };
  }
  
  @Render('about')
  @Get('/about')
  public about() {
    return {};
  }
  @Render('Login')
  @Get('/login')
  public login() {
    return {};
  }
  @Render('Signup')
  @Get('/signup')
  public register() {
    return {};
  }
  @Render('Workspace')
  @Get('/workspace/:workspace/channel/:channel')
  public channel(@Param('workspace') workspace: string, @Param('channel') channel: string) {
    return {workspace, channel};
  }
  @Render('channel')
  @Get('channel')
  public channel2(@Param('workspace') workspace: string, @Param('channel') channel: string) {
    return {workspace, channel};
  }
}

