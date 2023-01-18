import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, DeleteDateColumn, OneToMany, JoinTable, ManyToMany } from 'typeorm';
import { ChannelChats } from './ChannelChats';
import { Channelmembers } from './ChannelMembers';
import { Channels } from './Channels';
import { Dms } from './Dms';
import { Mentions } from './Mentions';
import { Workspacemembers } from './WorkspaceMembers';
import { Workspaces } from './Workspaces';


@Entity('users', { schema: 'public' })
export default class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
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

    @OneToMany(()=>ChannelChats, (channelChats)=>channelChats.user)
    channelChats: ChannelChats[];

    @OneToMany(()=>Channelmembers, (channelMembers)=>channelMembers.user)
    channelMembers: Channelmembers[];

    @OneToMany(()=>Dms, (dms)=>dms.sender)
    dms: Dms[];

    @OneToMany(()=>Dms, (dms)=>dms.receiver)
    dms2: Dms[];

    @OneToMany(()=>Mentions, (mentions)=>mentions.sender)
    mentions: Mentions[];

    @OneToMany(()=>Mentions, (mentions)=>mentions.receiver)
    mentions2: Mentions[];

    @OneToMany(()=>Workspacemembers, (workspaceMembers)=>workspaceMembers.user)
    workspaceMembers: Workspacemembers[];

    @OneToMany(()=>Workspaces, (workspaceMembers)=>workspaceMembers.owner)
    ownedWorkspaces: Workspaces[];

    @ManyToMany(()=>Workspaces, (Workspaces)=>Workspaces.members)
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
    workspaces: Workspaces[];

    @ManyToMany(()=>Channels, (channels)=>channels.members)
    @JoinTable({
        name: 'channelMembers',
        joinColumn: {
            name: 'userid',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'channelid',
            referencedColumnName: 'id',
        },
    })
    channels: Channels[];



}