import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Channels } from "./Channels";
import { Dms } from "./Dms";
import { Mentions } from "./Mentions";
import Users from "./Users";
import { WorkspaceMembers } from "./WorkspaceMembers";

@Entity({ schema: 'slardrich', name: 'workspaces' })
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
    OwnerId: number;

    @OneToMany(()=>Channels, channel=>channel.Workspace)
    Channels: Channels[];

    @OneToMany(()=>Dms, dm=>dm.Workspace)
    Dms: Dms[];

    @OneToMany(()=>Mentions, mention=>mention.Workspace)
    Mentions: Mentions[];

    @OneToMany(()=>WorkspaceMembers, workspaceMember=>workspaceMember.Workspace,
    {cascade: ['insert']})
    WorkspaceMembers: WorkspaceMembers[];

    @ManyToOne(()=>Users, user=>user.Workspaces,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'OwnerId', referencedColumnName: 'id'})
    Owner: Users;

    @ManyToMany(()=>Users, user=>user.Workspaces)
    Members: Users[];




}