import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { TicketEntity } from './ticket.entity';
import { ServiceEntity } from './service.entity';
import { TechnicianEntity } from './technician.entity';
import { TicketServiceStatus } from '../enums/ticket.enum';

@Entity()
export class TicketServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => TicketEntity, ticket => ticket.ticketServices, { onDelete: 'CASCADE' })
  ticket: TicketEntity;

  @ManyToOne(() => ServiceEntity, service => service.ticketServices, { onDelete: 'RESTRICT' })
  service: ServiceEntity;

  @ManyToOne(() => TechnicianEntity, tech => tech.user, { onDelete: 'SET NULL'})
  technician: TechnicianEntity;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  unitPrice: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  discount: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0})
  subTotal: number;

  @Column({ type: 'enum', enum: TicketServiceStatus })
  status: TicketServiceStatus;

  @Column({ type: 'text', nullable: true })
  imageUrl?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
