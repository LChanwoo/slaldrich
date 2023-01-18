import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Channels } from "./Channels";
import { Dms } from "./Dms";
import { Mentions } from "./Mentions";
import Users from "./Users";
import { Workspacemembers } from "./WorkspaceMembers";

@Entity( 'workspaces', { schema: 'public' } )
export class Workspaces extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
    @DeleteDateColumn()
    deletedAt: Date;

    @Column()
    ownerId: number;

    @OneToMany(()=>Channels, channel=>channel.workspace)
    channels: Channels[];

    @OneToMany(()=>Dms, dm=>dm.workspace)
    dms: Dms[];

    @OneToMany(()=>Mentions, mention=>mention.workspace)
    mentions: Mentions[];

    @OneToMany(()=>Workspacemembers, workspaceMember=>workspaceMember.workspace,
    {cascade: ['insert']})
    workspaceMembers: Workspacemembers[];

    @ManyToOne(()=>Users, user=>user.workspaces,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'ownerId', referencedColumnName: 'id'})
    owner: Users;

    @ManyToMany(()=>Users, user=>user.workspaces)
    members: Users[];




}