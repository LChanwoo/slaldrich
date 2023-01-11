import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity("mentions")
export class Mentions extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: number;

    @Column()
    chatId: number;

    @Column()
    workspaceId: number;

    @Column()
    senderId: number;

    @Column()
    receiverId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}