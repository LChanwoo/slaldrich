import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Channels } from "./Channels";
import Users from "./Users";

@Entity('channelchats', { schema: 'public' } )
export class ChannelChats extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    channelId: number;

    @Column()
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(()=>Users, user=>user.channelChats,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'userid', referencedColumnName: 'id'})
    user: Users;

    @ManyToOne(()=>Channels, channel=>channel.channelChats,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'channelid', referencedColumnName: 'id'})
    channel: Channels;

}