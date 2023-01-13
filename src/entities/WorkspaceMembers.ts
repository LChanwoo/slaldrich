import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Users from "./Users";
import { Workspaces } from "./Workspaces";
@Entity('workspaceMembers', { schema: 'slardrich' })
export class WorkspaceMembers extends BaseEntity {
    @Column()
    WorkspacesId: number;

    @Column()
    UserId: number;

    @Column()
    loggedInAt: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(()=>Workspaces, workspace=>workspace.WorkspaceMembers,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'WorkspacesId', referencedColumnName: 'id'})
    Workspace: Workspaces;

    @ManyToOne(()=>Users, user=>user.WorkspaceMembers,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'UserId', referencedColumnName: 'id'})
    User: Users;

}