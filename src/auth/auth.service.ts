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
        const user = await this.usersRepository.findOne({
            where: {
                email,
            },
            select: ['id', 'email', 'password'],
        });
        const result = await bcrypt.compare(user?.password, password);
        if(user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
