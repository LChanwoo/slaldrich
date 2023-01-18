import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { ChannelChats } from '../entities/ChannelChats';
import { Channelmembers } from '../entities/ChannelMembers';
import { Channels } from '../entities/Channels';
import Users from '../entities/Users';
import { Workspaces } from '../entities/Workspaces';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class ChannelsService {
    constructor(
        @InjectRepository(Channels)
        private channelsRepository: Repository<Channels>,
        @InjectRepository(Channelmembers)
        private channelMembersRepository: Repository<Channelmembers>,
        @InjectRepository(Workspaces)
        private workspacesRepository: Repository<Workspaces>,
        @InjectRepository(ChannelChats)
        private channelChatsRepository: Repository<ChannelChats>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private readonly eventsGateway: EventsGateway,
      ) {}
    async findById(id: number) {
        return this.channelsRepository.findOne({ where: { id } });
    }
      
    async getWorkspaceChannels(url: string, myId: number) {
        return this.channelsRepository
        .createQueryBuilder('channels')
        .innerJoinAndSelect(
            'channels.channelmembers',
            'channelmembers',
            'channelmembers.userid = :myId',
            { myId },
        )
        .innerJoinAndSelect(
            'channels.workspace',
            'workspace',
            'workspace.url = :url',
            { url },
        )
        .getMany();
    }

    async getWorkspaceChannel(url: string, name: string) {
        return this.channelsRepository
          .createQueryBuilder('channel')
          .innerJoin('channel.workspace', 'workspace', 'workspace.url = :url', {
            url,
          })
          .where('channel.name = :name', { name })
          .getOne();
    }

    async createWorkspaceChannels(url: string, name: string, myId: number) {
        const workspace = await this.workspacesRepository.findOne({
        where: { url },
        });
        const channel = new Channels();
        channel.name = name;
        channel.workspaceId = workspace.id;
        const channelReturned = await this.channelsRepository.save(channel);
        const channelMember = new Channelmembers();
        channelMember.userid = myId;
        channelMember.channelid = channelReturned.id;
        await this.channelMembersRepository.save(channelMember);
    }

    async getWorkspaceChannelMembers(url: string, name: string) {
        return this.usersRepository
          .createQueryBuilder('user')
          .innerJoin('user.channels', 'channels', 'channels.name = :name', {
            name,
          })
          .innerJoin('channels.workspace', 'workspace', 'workspace.url = :url', {
            url,
          })
          .getMany();
      }
    async createWorkspaceChannelMembers(url, name, email) {
        const channel = await this.channelsRepository
            .createQueryBuilder('channel')
            .innerJoin('channel.workspace', 'workspace', 'workspace.url = :url', {
            url,
            })
            .where('channel.name = :name', { name })
            .getOne();
        if (!channel) {
            return null;
        }
        const user = await this.usersRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .innerJoin('user.workspaces', 'workspace', 'workspace.url = :url', {
            url,
            })
            .getOne();
        if (!user) {
            return null;
        }
        const channelMember = new Channelmembers();
        channelMember.channelid = channel.id;
        channelMember.userid = user.id;
        await this.channelMembersRepository.save(channelMember);
    }

    async getWorkspaceChannelChats(
        url: string,
        name: string,
        perPage: number,
        page: number,
      ) {
        return this.channelChatsRepository
          .createQueryBuilder('channelChats')
          .innerJoin('channelChats.channel', 'channel', 'channel.name = :name', {
            name,
          })
          .innerJoin('channel.workspace', 'workspace', 'workspace.url = :url', {
            url,
          })
          .innerJoinAndSelect('channelChats.user', 'user')
          .orderBy('channelChats.createdAt', 'DESC')
          .take(perPage)
          .skip(perPage * (page - 1))
          .getMany();
    }

    async createWorkspaceChannelChats(
        url: string,
        name: string,
        content: string,
        myId: number,
    ) {
        const channel = await this.channelsRepository
          .createQueryBuilder('channel')
          .innerJoin('channel.workspace', 'workspace', 'workspace.url = :url', {
            url,
          })
          .where('channel.name = :name', { name })
          .getOne();
        const chats = new ChannelChats();
        chats.content = content;
        chats.userId = myId;
        chats.channelId = channel.id;
        const savedChat = await this.channelChatsRepository.save(chats);
        const chatWithUser = await this.channelChatsRepository.findOne({
          where: { id: savedChat.id },
          relations: ['user', 'channel'],
        });
        this.eventsGateway.server
          .to(`/ws-${url}-${chatWithUser.channelId}`)
          .emit('message', chatWithUser);
    }

    async createWorkspaceChannelImages(
        url: string,
        name: string,
        files: Express.Multer.File[],
        myId: number,
        ){
        console.log(files);
        const channel = await this.channelsRepository
          .createQueryBuilder('channel')
          .innerJoin('channel.workspace', 'workspace', 'workspace.url = :url', {
            url,
          })
          .where('channel.name = :name', { name })
          .getOne();
        for (let i = 0; i < files.length; i++) {
          const chats = new ChannelChats();
          chats.content = files[i].path;
          chats.userId = myId;
          chats.channelId = channel.id;
          const savedChat = await this.channelChatsRepository.save(chats);
          const chatWithUser = await this.channelChatsRepository.findOne({
            where: { id: savedChat.id },
            relations: ['user', 'channel'],
          });
          this.eventsGateway.server
            // .of(`/ws-${url}`)
            .to(`/ws-${url}-${chatWithUser.channelId}`)
            .emit('message', chatWithUser);
        }
    }

    async getChannelUnreadsCount(url, name, after) {
        const channel = await this.channelsRepository
          .createQueryBuilder('channel')
          .innerJoin('channel.workspace', 'workspace', 'workspace.url = :url', {
            url,
          })
          .where('channel.name = :name', { name })
          .getOne();
        return this.channelChatsRepository.count({
          where: {
            channelId: channel.id,
            createdAt: MoreThan(new Date(after)),
          },
        });
      }
}
