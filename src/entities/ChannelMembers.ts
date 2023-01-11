import { BaseEntity, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("channelMembers")
export class ChannelMembers extends BaseEntity {

    @PrimaryGeneratedColumn()
    channelId: number;

    @PrimaryGeneratedColumn()
    userId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}