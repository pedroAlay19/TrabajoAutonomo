import { Column, OneToMany, ChildEntity } from 'typeorm';
import { TicketServiceEntity } from './ticket-service.entity';
import { UserEntity } from './user.entity';

@ChildEntity('Technician')
export class TechnicianEntity extends UserEntity {
  @OneToMany(() => TicketServiceEntity, ts => ts.technician)
  ticketServices!: TicketServiceEntity[];

  @Column()
  specialty!: string;

  @Column({ type: 'int', default: 0})
  experienceYears!: number;

  @Column()
  active!: boolean;
}