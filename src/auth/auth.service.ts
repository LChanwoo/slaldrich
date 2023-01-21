import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Users from '../entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        // console.log('validateUser', email, password)
        try{
            const user = await this.usersRepository.findOne({
                where: { email },
                select: ['id', 'email', 'nickname', 'password'],
            });
            // console.log('user', user)
            const result = await bcrypt.compare(password,user.password);
            if(user && result) {
                const { password, ...result } = user;
                return result;
            }
            return null;

        }catch(e){
            console.error(e);
            return null;
        }
    }
}
