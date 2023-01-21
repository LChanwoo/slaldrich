import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import Users from '../entities/Users';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Users) private Repository: Repository<Users>,
  ) {
    super();
  }

  serializeUser(user: Users, done: CallableFunction) {
    // console.log(user);
    done(null, user);
  }

  async deserializeUser(userId: Users, done: CallableFunction) {
    // console.log("userId", userId)
    return await this.usersRepository
      .findOneOrFail({
        where: { id: userId.id },
        select: ['id', 'email', 'nickname'],
        relations: ['workspaces'],
      })
      .then((user) => {
        // console.log('user', user);
        done(null, user);
      })
      .catch((error) => done(error));
  }
}
