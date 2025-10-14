import { Column, ChildEntity } from 'typeorm';
// import { TicketServiceEntity } from '../../domain/entities/ticket-service.entity';
import { User } from './user.entity';
import { UserRole } from './enums/user-role.enum';

@ChildEntity(UserRole.TECHNICIAN)
export class Technician extends User {
  // @OneToMany(() => TicketServiceEntity, ts => ts.technician, {nullable: true})
  // ticketServices?: TicketServiceEntity[]; Por el momento para probar

  @Column()
  specialty!: string;

  @Column({ type: 'int', default: 0})
  experienceYears!: number;

  @Column()
  active!: boolean;
}