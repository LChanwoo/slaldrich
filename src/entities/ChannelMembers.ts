import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Channels } from "./Channels";
import Users from "./Users";

@Entity({ schema: 'slaldrich', name: 'channelMembers' })
export class ChannelMembers extends BaseEntity {

    @Column()
    ChannelId: number;

    @Column()
    UserId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(()=>Channels, channel=>channel.ChannelMembers,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'ChannelId', referencedColumnName: 'id'})
    Channel: Channels;

    @ManyToOne(()=>Users, user=>user.ChannelMembers,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'UserId', referencedColumnName: 'id'})
    User: Users;

}