import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TicketServiceEntity } from './ticket-service.entity';

@Entity()
export class ServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  serviceName: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'numeric', scale: 2, default: 0 })
  basePrice: number;

  @Column({ type: 'int', nullable: true })
  estimatedTimeMinutes?: number;

  @Column({ type: 'boolean', default: false })
  requiresParts: boolean;

  @Column()
  category: string;

  @Column({ type: 'text', nullable: true })
  imageUrl: string[];

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @OneToMany(() => TicketServiceEntity, ts => ts.service)
  ticketServices: TicketServiceEntity;
}