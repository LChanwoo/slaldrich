import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ChannelChats } from "./ChannelChats";
import { ChannelMembers } from "./ChannelMembers";
import Users from "./Users";
import { Workspaces } from "./Workspaces";

@Entity("channels")
export class Channels extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    private: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    workspaceId: number;

    @OneToMany(()=>ChannelChats, channelChat=>channelChat.Channel)
    ChannelChats: ChannelChats[];

    @OneToMany(()=>ChannelMembers, channelMember=>channelMember.Channel,{
        cascade:['insert']
    })
    ChannelMembers: ChannelMembers[];


    @ManyToMany(() => Users, (users) => users.Channels)
    Members: Users[];

    @ManyToOne(()=>Workspaces, workspace=>workspace.Channels,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    Workspace: Workspaces;
}