import { Body, Controller, ForbiddenException, Get, NotFoundException, Post, UseGuards } from '@nestjs/common';
import { User } from '../common/decorators/user.decorator';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { NotLoggedInGuard } from '../common/guards/not-logged-in.guard';
import Users from '../entities/Users';
import { JoinRequestDto } from './dto/join-request.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
    constructor(private usersService : UsersService) {}

    // @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@User() user: Users) {
      return user;
    }
    // @UseGuards(NotLoggedInGuard)
    @Post()
    async join(@Body() data: JoinRequestDto) {
        console.log(data)
      const user = this.usersService.findByEmail(data.email);
      if (!user) {
        throw new NotFoundException();
      }
      const result = await this.usersService.join(
        data.email,
        data.nickname,
        data.password,
      );
      if (result) {
        return 'ok';
      } else {
        throw new ForbiddenException();
      }
    }

    @Get('test')
    async test() {
        return this.usersService.test();
    }


}
