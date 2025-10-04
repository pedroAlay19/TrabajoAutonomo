import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { TicketEntity } from './ticket.entity';
import { PartEntity } from './part.entity';

@Entity('ticket_parts')
export class TicketPartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => TicketEntity, ticket => ticket.ticketParts, { onDelete: 'CASCADE' })
  ticket: TicketEntity;

  @ManyToOne(() => PartEntity, part => part.ticketParts, { onDelete: 'RESTRICT' })
  part: PartEntity;

  @Column({type: 'int'})
  quantity: number

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0})
  subTotal: number;

  @Column({ type: 'text', nullable: true})
  imgUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}