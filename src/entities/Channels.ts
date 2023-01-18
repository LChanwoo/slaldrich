import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ChannelChats } from "./ChannelChats";
import { Channelmembers } from "./ChannelMembers";
import Users from "./Users";
import { Workspaces } from "./Workspaces";

@Entity("channels", { schema: 'public' })
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

    @OneToMany(()=>ChannelChats, channelChat=>channelChat.channel)
    channelChats: ChannelChats[];

    @OneToMany(()=>Channelmembers, channelMember=>channelMember.channel,{
        cascade:['insert']
    })
    channelMembers: Channelmembers[];


    @ManyToMany(() => Users, (users) => users.channels)
    members: Users[];

    @ManyToOne(()=>Workspaces, workspace=>workspace.channels,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    workspace: Workspaces;
}