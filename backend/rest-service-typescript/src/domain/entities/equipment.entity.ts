import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EquipmentStatus, EquipmentType } from "../enums/equipment.enum";
import { TicketEntity } from "./ticket.entity";
import { UserEntity } from "./user.entity";

@Entity('Equipment')
export class EquipmentEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => UserEntity, user => user.equipments)
  user!: UserEntity;
  
  @Column()
  name!: string;

  @Column({ type: 'enum', enum: EquipmentType})
  type!: EquipmentType;

  @Column()
  brand!: string;

  @Column()
  model!: string;

  @Column({nullable: true})
  serialNumber?: string;

  @Column({nullable: true})
  observations?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({type: 'enum', enum: EquipmentStatus, default: EquipmentStatus.IN_REPAIR})
  currentStatus!: EquipmentStatus;

  @OneToMany(() => TicketEntity, ticket => ticket.equipment)
  tickets!: TicketEntity[];
}
