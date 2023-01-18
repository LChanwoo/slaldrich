import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Channelmembers } from '../entities/ChannelMembers';
import { Channels } from '../entities/Channels';
import Users from '../entities/Users';
import { Workspacemembers } from '../entities/WorkspaceMembers';
import { Workspaces } from '../entities/Workspaces';

@Injectable()
export class WorkspacesService {
    @InjectRepository(Workspaces)
    private workspacesRepository: Repository<Workspaces>;
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>;
    @InjectRepository(Workspacemembers)
    private workspaceMembersRepository: Repository<Workspacemembers>;
    @InjectRepository(Channelmembers)
    private channelMembersRepository: Repository<Channelmembers>;
    @InjectRepository(Users)
    private usersRepository: Repository<Users>;
  
    async findById(id: number) {
        return this.workspacesRepository.findOne({ where: { id } });
      }
    
      async findMyWorkspaces(myId: number) {
        return this.workspacesRepository.find({
          where: {
            Workspacemembers: [{ userid: myId }],
          } as any,
        });
      }

  async createWorkspace(name: string, url: string, myId: number) {
    try{
        const workspace = new Workspaces();
        workspace.name = name;
        workspace.url = url;
        workspace.ownerId = myId;
        const returned = await this.workspacesRepository.save(workspace);
        const workspaceMember = new Workspacemembers();
        workspaceMember.userid = myId;
        workspaceMember.workspaceid = returned.id;
        await this.workspaceMembersRepository.save(workspaceMember);
        const channel = new Channels();
        channel.name = '일반';
        channel.workspaceId = returned.id;
        channel.private = false;
        const channelReturned = await this.channelsRepository.save(channel);
        const channelMember = new Channelmembers();
        channelMember.userid = myId;
        channelMember.channelid = channelReturned.id;
        await this.channelMembersRepository.save(channelMember);
    }catch(e){
        console.error(e);
    }
  }

  async getWorkspaceMembers(url: string) {
    return this.usersRepository
      .createQueryBuilder('user')
      .innerJoin('user.workspacemembers', 'members')
      .innerJoin('members.workspace', 'workspace', 'workspace.url = :url', {
        url,
      })
      .getMany();
  }
  async createWorkspaceMembers(url, email) {
    const workspace = await this.workspacesRepository.findOne({
      where: { url },
      join: {
        alias: 'workspace',
        innerJoinAndSelect: {
          channels: 'workspace.channels',
        },
      },
    });
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const workspaceMember = new Workspacemembers();
    workspaceMember.workspaceid = workspace.id;
    workspaceMember.userid = user.id;
    await this.workspaceMembersRepository.save(workspaceMember);
    const channelMember = new Channelmembers();
    channelMember.channelid = workspace.channels.find(
      (v) => v.name === '일반',
    ).id;
    channelMember.userid = user.id;
    await this.channelMembersRepository.save(channelMember);
  }
  async getWorkspaceMember(url: string, id: number) {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .innerJoin('user.workspaces', 'workspaces', 'workspaces.url = :url', {
        url,
      })
      .getOne();
  }

}
