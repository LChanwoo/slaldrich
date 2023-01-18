import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Users from "./Users";
import { Workspaces } from "./Workspaces";
@Entity('mentions', { schema: 'public' })
export class Mentions extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: 'chat'|'dm'|'system';

    @Column()
    chatId: number;

    @Column()
    workspaceId: number;

    @Column()
    senderId: number;

    @Column()
    receiverId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(()=>Workspaces, workspace=>workspace.mentions,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'workspaceId', referencedColumnName: 'id'})
    workspace: Workspaces;

    @ManyToOne(()=>Users, user=>user.mentions,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'senderId', referencedColumnName: 'id'})
    sender: Users;

    @ManyToOne(()=>Users, user=>user.mentions,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'receiverId', referencedColumnName: 'id'})
    receiver: Users;
}