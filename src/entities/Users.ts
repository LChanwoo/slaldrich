import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, DeleteDateColumn, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { ChannelChats } from './ChannelChats';
import { ChannelMembers } from './ChannelMembers';
import { Channels } from './Channels';
import { Dms } from './Dms';
import { Mentions } from './Mentions';
import { WorkspaceMembers } from './WorkspaceMembers';
import { Workspaces } from './Workspaces';


@Entity({ schema: 'slardrich', name: 'users' })
export default class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    nickname: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(()=>ChannelChats, (channelChats)=>channelChats.User)
    ChannelChats: ChannelChats[];

    @OneToMany(()=>ChannelMembers, (channelMembers)=>channelMembers.User)
    ChannelMembers: ChannelMembers[];

    @OneToMany(()=>Dms, (dms)=>dms.Sender)
    Dms: Dms[];

    @OneToMany(()=>Dms, (dms)=>dms.Receiver)
    Dms2: Dms[];

    @OneToMany(()=>Mentions, (mentions)=>mentions.Sender)
    Mentions: Mentions[];

    @OneToMany(()=>Mentions, (mentions)=>mentions.Receiver)
    Mentions2: Mentions[];

    @OneToMany(()=>WorkspaceMembers, (workspaceMembers)=>workspaceMembers.User)
    WorkspaceMembers: WorkspaceMembers[];

    @OneToMany(()=>Workspaces, (workspaceMembers)=>workspaceMembers.Owner)
    OwnedWorkspaces: Workspaces[];

    @ManyToMany(()=>Workspaces, (Workspaces)=>Workspaces.Members)
    @JoinTable({
        name: 'workspaceMembers',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'workspaceId',
            referencedColumnName: 'id',
        },
    })
    Workspaces: Workspaces[];

    @ManyToMany(()=>Channels, (channels)=>channels.Members)
    @JoinTable({
        name: 'channelMembers',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'channelId',
            referencedColumnName: 'id',
        },
    })
    Channels: Channels[];



}