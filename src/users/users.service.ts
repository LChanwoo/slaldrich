import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Channelmembers } from '../entities/ChannelMembers';
import Users from '../entities/Users';
import { Workspacemembers } from '../entities/WorkspaceMembers';
import * as bcrypt from 'bcrypt';
import { Workspaces } from '../entities/Workspaces';
import { Channels } from '../entities/Channels';
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        @InjectRepository(Channelmembers)
        private channelMembersRepository: Repository<Channelmembers>,
        ///
        @InjectRepository(Workspaces)
        private workspacesRepository: Repository<Workspaces>,
        @InjectRepository(Channels)
        private channelsRepository: Repository<Channels>,
        ///
        private dataSource: DataSource,
      ) {}

    async findByEmail(email: string) {
        return this.usersRepository.findOne({
        where: { email },
        select: ['id', 'email', 'password'],
        });
    }
    async join(email: string, nickname: string, password: string) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const user = await queryRunner.manager
          .getRepository(Users)
          .findOne({ where: { email } });
        if (user) {
          throw new ForbiddenException('이미 존재하는 사용자입니다');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        try {
          const returned = await queryRunner.manager.getRepository(Users).save({
            email,
            nickname,
            password: hashedPassword,
          });
          const workspaceMember = queryRunner.manager
            .getRepository(Workspacemembers)
            .create();
          workspaceMember.workspaceid = 1;
          workspaceMember.userid = returned.id;
          workspaceMember.loggedInAt = new Date();
          await queryRunner.manager
            .getRepository(Workspacemembers)
            .save(workspaceMember);
          await queryRunner.manager.getRepository(Channelmembers).save({
            userid: returned.id,
            channelid: 1,
          });
          await queryRunner.commitTransaction();
          return true;
        } catch (error) {
          console.error(error);
          await queryRunner.rollbackTransaction();
          throw error;
        } finally {
          await queryRunner.release();
        }
      }
    async test() {
        try{
        const newuser = new Users();
        newuser.id = 1;
        newuser.email = 'test1@test.com';
        newuser.nickname = 'test';
        newuser.password = 'test';
        await this.usersRepository.save(newuser);

        const newworkspace = new Workspaces();
        newworkspace.name = 'sleact';
        newworkspace.url = 'sleact';
        newworkspace.ownerid = 1;
        await this.workspacesRepository.save(newworkspace);
        
        const newchannel = new Channels();
        newchannel.name = '일반';
        newchannel.workspaceid = 1;
        newchannel.private = false;
        
        const newchannelmember = new Channelmembers();
        newchannelmember.userid = 1;
        newchannelmember.channelid = 1;
        await this.channelsRepository.save(newchannel);
        await this.channelMembersRepository.save(newchannelmember);
        // await this.channelMembersRepository.save(newchannelmember);

        }catch(error){
            console.error(error);
        }
        try{
            const allusers = await this.usersRepository.find();
            // return allusers;
            const allworkspaces = await this.workspacesRepository.find();
            // return allworkspaces;
            const allchannels = await this.channelsRepository.find();
            // return allchannels;
            const allchannelmembers = await this.channelMembersRepository.find();
            // return allchannelmembers;
            return {
                allusers,
                allworkspaces,
                allchannels,
                allchannelmembers,
            }
        }catch(e){
            console.error(e);
        }
        return 'ok';


        // return this.usersRepository.find();
    }
    async test2() {
      const allusers = await this.usersRepository.find();
      // return allusers;
      const allworkspaces = await this.workspacesRepository.find();
      // return allworkspaces;
      const allchannels = await this.channelsRepository.find();
      // return allchannels;
      const allchannelmembers = await this.channelMembersRepository.find();
      // return allchannelmembers;
      return {
          allusers,
          allworkspaces,
          allchannels,
          allchannelmembers,
      }
    }
}
