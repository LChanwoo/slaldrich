import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Users from "./Users";
import { Workspaces } from "./Workspaces";

@Entity({ schema: 'slardrich', name: 'dms' })
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
    WorkspaceId: number;

    @Column()
    SenderId: number;

    @Column()
    ReceiverId: number;

    @ManyToOne(()=>Users, user=>user.Dms,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'SenderId', referencedColumnName: 'id'})
    Sender: Users;

    @ManyToOne(()=>Users, user=>user.Dms,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'ReceiverId', referencedColumnName: 'id'})
    Receiver: Users;

    @ManyToOne(()=>Workspaces, workspace=>workspace.Dms,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'WorkspaceId', referencedColumnName: 'id'})
    Workspace: Workspaces;

}