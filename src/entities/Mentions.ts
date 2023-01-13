import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Users from "./Users";
import { Workspaces } from "./Workspaces";
@Entity({ schema: 'slardrich', name: 'mentions' })
export class Mentions extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: 'chat'|'dm'|'system';

    @Column()
    ChatId: number;

    @Column()
    WorkspaceId: number;

    @Column()
    SenderId: number;

    @Column()
    ReceiverId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(()=>Workspaces, workspace=>workspace.Mentions,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'WorkspaceId', referencedColumnName: 'id'})
    Workspace: Workspaces;

    @ManyToOne(()=>Users, user=>user.Mentions,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'SenderId', referencedColumnName: 'id'})
    Sender: Users;

    @ManyToOne(()=>Users, user=>user.Mentions,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'ReceiverId', referencedColumnName: 'id'})
    Receiver: Users;
}