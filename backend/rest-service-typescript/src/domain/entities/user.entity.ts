import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from "typeorm";
import { UserRole } from "../enums/user-role.enum";
import { EquipmentEntity } from "./equipment.entity";

@Entity('User')
@TableInheritance({ column: { type: "varchar", name: "role" } })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  lastName!: string;

  @Column({unique: true})
  email!: string;

  @Column()
  phone!: string;

  @Column()
  address!: string;

  @Column({type: 'enum', enum: UserRole})
  role!: UserRole;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => EquipmentEntity, equipment => equipment.user, {nullable: true})
  equipments?: EquipmentEntity[];
}
