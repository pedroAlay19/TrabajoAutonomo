import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { TicketEntity } from './ticket.entity';
import { PartEntity } from './part.entity';

@Entity('Ticket-Part')
export class TicketPartEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => TicketEntity, ticket => ticket.ticketParts)
  ticket!: TicketEntity;

  @ManyToOne(() => PartEntity, part => part.ticketParts)
  part!: PartEntity;

  @Column({type: 'int'})
  quantity!: number

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0})
  subTotal!: number;

  @Column({ type: 'text', nullable: true})
  imgUrl?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}