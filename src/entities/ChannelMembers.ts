import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Channels } from "./Channels";
import Users from "./Users";

@Entity('channelmembers', { schema: 'public' } )
export class Channelmembers extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({primary: true})
    channelid: number;

    @Column({primary: true})
    userid: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(()=>Channels, channel=>channel.channelmembers,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'channelid', referencedColumnName: 'id'})
    channel: Channels;

    @ManyToOne(()=>Users, user=>user.channelmembers,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'userid', referencedColumnName: 'id'})
    user: Users;

}