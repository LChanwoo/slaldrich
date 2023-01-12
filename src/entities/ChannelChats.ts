import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Channels } from "./Channels";
import Users from "./Users";

@Entity({ schema: 'slaldrich', name: 'channelchats' })
export class ChannelChats extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    UserId: number;

    @Column()
    ChannelId: number;

    @Column()
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(()=>Users, user=>user.ChannelChats,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'UserId', referencedColumnName: 'id'})
    User: Users;

    @ManyToOne(()=>Channels, channel=>channel.ChannelChats,{
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'ChannelId', referencedColumnName: 'id'})
    Channel: Channels;

}