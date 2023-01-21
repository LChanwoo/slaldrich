import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Users from "./Users";
import { Workspaces } from "./Workspaces";

@Entity('dms' , { schema: 'public' })
export class Dms extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    workspaceid: number;

    @Column()
    senderId: number;

    @Column()
    receiverId: number;

    @ManyToOne(()=>Users, user=>user.dms,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'senderId', referencedColumnName: 'id'})
    sender: Users;

    @ManyToOne(()=>Users, user=>user.dms,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'ReceiverId', referencedColumnName: 'id'})
    receiver: Users;

    @ManyToOne(()=>Workspaces, workspace=>workspace.dms,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'workspaceId', referencedColumnName: 'id'})
    workspace: Workspaces;

}