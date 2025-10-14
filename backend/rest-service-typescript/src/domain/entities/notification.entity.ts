import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { TicketEntity } from './ticket.entity';

@Entity('Notification')
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => TicketEntity, ticket => ticket.notifications)
  ticket!: TicketEntity;

  @Column()
  title!: string;

  @Column({ type: 'text'})
  message!: string;

  @Column({ type: 'timestamptz', nullable: true })
  sentAt!: Date;

  @Column()
  status?: string;

  @Column()
  type?: string; // 'email','sms','ws'

  @CreateDateColumn()
  createdAt!: Date;
}
