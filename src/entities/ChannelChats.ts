import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Channels } from "./Channels";
import Users from "./Users";

@Entity('channelchats', { schema: 'public' } )
export class ChannelChats extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userid: number;

    @Column()
    channelid: number;

    @Column()
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(()=>Users, user=>user.channelchats,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'userid', referencedColumnName: 'id'})
    user: Users;

    @ManyToOne(()=>Channels, channel=>channel.channelchats,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'channelid', referencedColumnName: 'id'})
    channel: Channels;

}