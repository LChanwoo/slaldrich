import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Dms } from '../entities/Dms';
import Users from '../entities/Users';
import { Workspaces } from '../entities/Workspaces';
import { EventsGateway, onlineMap } from '../events/events.gateway';
function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
@Injectable()
export class DmsService {
    constructor(
        @InjectRepository(Workspaces)
        private workspacesRepository: Repository<Workspaces>,
        @InjectRepository(Dms) private dmsRepository: Repository<Dms>,
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        private readonly eventsGateway: EventsGateway,
      ) {}
    
    async getWorkspaceDMs(url: string, myId: number) {
        return (
        this.usersRepository
            .createQueryBuilder('user')
            .leftJoin('user.dms', 'dms', 'dms.senderId = :myId', { myId })
            .leftJoin('dms', 'workspace', 'workspace.url = :url', { url })
            // .groupBy('dms.senderId')
            .getMany()
        );
    }
    async getWorkspaceDMChats(
            url: string,
            id: number,
            myId: number,
            perPage: number,
            page: number,
    ) {
        return this.dmsRepository
        .createQueryBuilder('dms')
        .innerJoinAndSelect('dms.sender', 'sender')
        .innerJoinAndSelect('dms.receiver', 'receiver')
        .innerJoin('dms.workspace', 'workspace')
        .where('workspace.url = :url', { url })
        .andWhere(
            '((dms.senderId = :myId AND dms.receiverId = :id) OR (dms.receiverId = :myId AND dms.senderId = :id))',
            { id, myId },
        )
        .orderBy('dms.createdAt', 'DESC')
        .take(perPage)
        .skip(perPage * (page - 1))
        .getMany();
    }
    async createWorkspaceDMChats(
        url: string,
        content: string,
        id: number,
        myId: number,
        ) {
            try{
                const workspace = await this.workspacesRepository.findOne({
                    where: { url },
                });
                const dm = new Dms();
                dm.senderId = myId;
                dm.receiverId = id;
                dm.content = content;
                dm.workspaceid = workspace!.id;
                const savedDm = await this.dmsRepository.save(dm);
                const dmWithSender = await this.dmsRepository.findOne({
                    where: { id: savedDm.id },
                    relations: ['sender'],
                });
                const receiverSocketId = getKeyByValue(
                    onlineMap[`/ws-${workspace!.url}`],
                    Number(id),
                );
                // console.log(dmWithSender)
                this.eventsGateway.server.to(receiverSocketId!).emit('dm', dmWithSender);
            }  catch (error) {
                console.log("이 밑으로 에러")
                console.error(error);
            }
    }
    async createWorkspaceDMImages(
        url: string,
        files: Express.Multer.File[],
        id: number,
        myId: number,
    ) {
        const workspace = await this.workspacesRepository.findOne({
            where: { url },
        });
        for (let i = 0; i < files.length; i++) {
            const dm = new Dms();
            dm.senderId = myId;
            dm.receiverId = id;
            dm.content = files[i].path;
            dm.workspaceid = workspace!.id;
            const savedDm = await this.dmsRepository.save(dm);
            const dmWithSender = await this.dmsRepository.findOne({
            where: { id: savedDm.id },
            relations: ['sender'],
        });
            const receiverSocketId = getKeyByValue(
                onlineMap[`/ws-${workspace!.url}`],
                Number(id),
            );
            this.eventsGateway.server.to(receiverSocketId!).emit('dm', dmWithSender);
        }
    }
    async getDMUnreadsCount(url, id, myId, after) {
        const workspace = await this.workspacesRepository.findOne({
            where: { url },
        });
        return this.dmsRepository.count({
            where: {
                workspaceid: workspace!.id,
                senderId: id,
                receiverId: myId,
                createdAt: MoreThan(new Date(after)),
            },
        });
    }

}
