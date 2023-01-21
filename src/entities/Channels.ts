import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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
    workspaceid: number;

    @OneToMany(()=>ChannelChats, channelChat=>channelChat.channel)
    channelchats: ChannelChats[];

    @OneToMany(()=>Channelmembers, channelMember=>channelMember.channel,{
        cascade:['insert']
    })
    channelmembers: Channelmembers[];


    @ManyToMany(() => Users, (users) => users.channels)
    members: Users[];

    @ManyToOne(()=>Workspaces, workspace=>workspace.channels,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn([{ name: 'workspaceid', referencedColumnName: 'id' }])
    workspace: Workspaces;
}