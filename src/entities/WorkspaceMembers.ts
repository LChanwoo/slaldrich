import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Workspaces } from './Workspaces';
  import Users  from './Users';
  
  @Entity('workspacemembers', { schema: 'public' })
  export class Workspacemembers {
    // @PrimaryGeneratedColumn()
    // id: number;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @Column('int', { primary: true, name: 'workspaceid' })
    workspaceid: number;
  
    @Column('int', { primary: true, name: 'userid' })
    userid: number;
  
    @Column('date', { name: 'loggedInAt', nullable: true })
    loggedInAt: Date | null;
  
    @ManyToOne(() => Workspaces, (workspaces) => workspaces.workspacemembers, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'workspaceid', referencedColumnName: 'id' }])
    workspace: Workspaces;
  
    @ManyToOne(() => Users, (users) => users.workspacemembers, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'userid', referencedColumnName: 'id' }])
    user: Users;
  }
  